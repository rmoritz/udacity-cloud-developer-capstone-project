import 'source-map-support/register'
import { createS3Client } from '../utils/s3'
import { createLogger } from '../utils/logger'

const logger = createLogger('dataLayer::getUploadUrl')
const s3 = createS3Client()
const attachmentsBucket = process.env.ATTACHMENTS_BUCKET
const expiry = process.env.SIGNED_URL_EXPIRY

export async function getUploadUrl(todoId: string) : Promise<string> {
    logger.debug(`Generating upload URL for TODO item ${todoId}...`)

    const uploadUrl = s3.getSignedUrl('putObject', {
        Bucket: attachmentsBucket,
        Key: todoId,
        Expires: expiry
    })

    logger.debug('Generated URL', uploadUrl)

    return uploadUrl
}