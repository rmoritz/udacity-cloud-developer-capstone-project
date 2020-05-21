// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'lfp3s9ha12'
export const apiEndpoint = `https://${apiId}.execute-api.eu-central-1.amazonaws.com/prod`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-0y3zcn6x.eu.auth0.com',            // Auth0 domain
  clientId: 'VBwzmjkvPSjlaFBPYHNlYylKYfWkQmyc',   // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
