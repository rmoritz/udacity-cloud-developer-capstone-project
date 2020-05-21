import 'source-map-support/register'
import { TodoItem } from '../models/TodoItem'
import { createDocumentClient } from '../utils/dynamoDb'
import { createLogger } from '../utils/logger'

const logger = createLogger('dataLayer::getAllTodoItemsForUser')
const docClient = createDocumentClient()
const todosTable = process.env.TODOS_TABLE
const todosIndex = process.env.TODOS_INDEX

export async function getAllTodoItemsForUser(userId: string) : Promise<TodoItem[]> {
  logger.debug(`Querying all TODO items for user ${userId}...`)

  const result = await docClient.query({
      TableName: todosTable,
      IndexName: todosIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
  }).promise()

  const items = result.Items as TodoItem[]

  console.debug(`Found ${items.length} TODO items`)

  return items
}
