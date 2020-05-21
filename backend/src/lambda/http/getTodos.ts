import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult
}
from 'aws-lambda'

import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils'
import { getAllTodoItemsForUser } from '../../dataLayer/getAllTodoItemsForUser'
import { createLogger } from '../../utils/logger'

const logger = createLogger('lambda::http::getTodos')

export const handler =
middy(async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)

  logger.info('Get all TODOs for user', userId)

  const items = await getAllTodoItemsForUser(userId)

  logger.info('Success!')

  return {
    statusCode: 200,
    body: JSON.stringify({ items })
  }
})

handler.use(
  cors({ credentials: true })
)
