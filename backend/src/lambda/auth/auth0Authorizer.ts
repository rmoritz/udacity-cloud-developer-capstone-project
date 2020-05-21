import 'source-map-support/register'
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import { verify, decode } from 'jsonwebtoken'
import { createLogger } from '../../utils/logger'
import Axios from 'axios'
import { Jwt } from '../../auth/Jwt'
import { JwtPayload } from '../../auth/JwtPayload'

const logger = createLogger('lambda::auth')

// URL to download certificates for verifying JWT token signatures
const jwksUrl = 'https://dev-0y3zcn6x.eu.auth0.com/.well-known/jwks.json'

// Certificates for verifying JWT token
let jwks = null

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  logger.info('Authorizing a user', event.authorizationToken)
  try {
    const jwtToken = await verifyToken(event.authorizationToken)
    logger.info('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader)
  const jwt = decodeToken(token)
  
  await fetchJwks()

  const key = getJwksSigningKey(jwt.header.kid)
  
  const payload = verify(token, key, {
    algorithms: ['RS256']
  })

  return payload as JwtPayload
}

function certToPEM( cert ) {
  let pem = cert.match( /.{1,64}/g ).join( '\n' );
  pem = `-----BEGIN CERTIFICATE-----\n${ cert }\n-----END CERTIFICATE-----\n`;
  return pem;
}

function getJwksSigningKey(kid) {
  const key = getJwksSigningKeys().find((k) => k.kid === kid )
  return key.publicKey || key.rsaPublicKey
}

function getJwksSigningKeys() {
  return jwks
    .filter(
      (key) =>
        key.use === 'sig' && // JWK property `use` determines the JWK is for signing
        key.kty === 'RSA' && // We are only supporting RSA (RS256)
        key.kid && // The `kid` must be present to be useful for later
        ((key.x5c && key.x5c.length) || (key.n && key.e)) // Has useful public keys
    )
    .map((key) => ({ 
      kid: key.kid, 
      nbf: key.nbf, 
      publicKey: certToPEM(key.x5c[0]) 
    }))
}

async function fetchJwks() : Promise<void> {
  if (jwks) return

  const res = await Axios.get(jwksUrl)
  jwks = res.data.keys
}

function decodeToken(token: string) : Jwt {
  const jwt: Jwt = decode(token, { complete: true }) as Jwt
  if (!jwt.header || jwt.header.alg !== 'RS256') throw new Error('Unsupported algorithm')
  return jwt
}

function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
