import 'source-map-support/register'

export function isOffline() : boolean {
    return process.env.IS_OFFLINE === 'true'
}
