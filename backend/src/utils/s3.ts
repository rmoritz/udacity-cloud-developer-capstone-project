import 'source-map-support/register'
import { isOffline } from './isOffline'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const offline = isOffline()
const XAWS = offline ? AWS : AWSXRay.captureAWS(AWS)

const options = {
    signatureVersion: 'v4'
}

const offlineOptions = {
    s3ForcePathStyle: true,
    ...options
}

export function createS3Client() {
    return offline ? new XAWS.S3(offlineOptions) : new XAWS.S3(options)
}
