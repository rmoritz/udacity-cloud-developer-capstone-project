// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'tgt0zjddvh'
const stage = 'prod'
export const apiEndpoint = `https://${apiId}.execute-api.eu-central-1.amazonaws.com/${stage}`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-0y3zcn6x.eu.auth0.com',            // Auth0 domain
  clientId: 'VBwzmjkvPSjlaFBPYHNlYylKYfWkQmyc',   // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
