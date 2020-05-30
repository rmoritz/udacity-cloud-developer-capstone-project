import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
}
from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import { createTodoUpdate } from '../../businessLogic/createTodoUpdate'
import { getUserId } from '../utils'
import { updateTodoItem } from '../../dataLayer/updateTodoItem'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda::http::updateTodo')

export const handler =
middy(async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const todoId = getTodoId(event)
  const request = getRequest(event)
  const update = createTodoUpdate(userId, todoId, request)

  logger.info(`Update TODO item ${todoId} for user ${userId}`)

  await updateTodoItem(update)

  logger.info('Success!')

  return {
    statusCode: 204,
    body: null
  }
})

handler.use(
  cors({ credentials: true })
)

function getTodoId(event: APIGatewayProxyEvent): string {
  return event.queryStringParameters.id
}

function getRequest(event: APIGatewayProxyEvent): UpdateTodoRequest {
  return JSON.parse(event.body);
}
