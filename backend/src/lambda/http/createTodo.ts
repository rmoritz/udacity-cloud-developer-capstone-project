import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
}
from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import { createTodoItem } from '../../businessLogic/createTodoItem'
import { insertTodoItem } from '../../dataLayer/insertTodoItem'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda::http::createTodo')

export const handler =
middy(async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)

  logger.info('Create TODO item for user', userId)

  const request = getRequest(event)
  const item = createTodoItem(userId, request)

  await insertTodoItem(item)
  
  logger.info('Success!')

  return {
    statusCode: 200,
    body: JSON.stringify({ item })
  }
})

handler.use(
  cors({ credentials: true })
)

function getRequest(event: APIGatewayProxyEvent): CreateTodoRequest {
  return JSON.parse(event.body);
}
