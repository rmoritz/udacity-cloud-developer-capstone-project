import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
}
from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { deleteTodoItem } from '../../dataLayer/deleteTodoItem'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda::http::deleteTodo')

export const handler =
middy(async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const todoId = getTodoId(event)

  logger.info(`Delete TODO item ${todoId} for user ${userId}`)
  
  await deleteTodoItem(userId, todoId)
  
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
  return event.pathParameters.todoId
}