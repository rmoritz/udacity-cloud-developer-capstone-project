import 'source-map-support/register'
import { isOffline } from './isOffline'
import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const offline = isOffline()
const XAWS = offline ? AWS : AWSXRay.captureAWS(AWS)

const offlineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000"
}

export function createDocumentClient() {
    return offline ? new XAWS.DynamoDB.DocumentClient(offlineOptions) : new XAWS.DynamoDB.DocumentClient()
}

export function createRawClient() {
    return offline ? new XAWS.DynamoDB(offlineOptions) : new XAWS.DynamoDB()
}
