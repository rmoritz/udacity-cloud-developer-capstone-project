import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
}
from 'aws-lambda'

import middy from '@middy/core'
import cors from '@middy/http-cors'
import { getUserId } from '../utils'
import { createAttachmentUrlUpdate } from '../../businessLogic/createAttachmentUrlUpdate'
import { updateAttachmentUrl } from '../../dataLayer/updateAttachmentUrl'
import { getUploadUrl } from '../../dataLayer/getUploadUrl'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda::http::generateUploadUrl')
const attachmentsBucket = process.env.ATTACHMENTS_BUCKET
const bucketUri = `https://${attachmentsBucket}.s3.amazonaws.com`

export const handler =
middy(async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const todoId = getTodoId(event)
  const imageUrl = `${bucketUri}/${todoId}`
  const update = createAttachmentUrlUpdate(userId, todoId, imageUrl)

  logger.info(`Generate upload URL for item ${todoId}`)

  await updateAttachmentUrl(update)
  const uploadUrl = await getUploadUrl(todoId)

  logger.info('Success!')

  return {
    statusCode: 200,
    body: JSON.stringify({ uploadUrl })
  }
})

handler.use(
  cors({ credentials: true })
)

function getTodoId(event: APIGatewayProxyEvent): string {
  return event.pathParameters.todoId
}
