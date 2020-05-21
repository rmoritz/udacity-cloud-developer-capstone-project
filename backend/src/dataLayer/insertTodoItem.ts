import 'source-map-support/register'
import { TodoItem } from '../models/TodoItem'
import { createDocumentClient } from '../utils/dynamoDb'
import { createLogger } from '../utils/logger'

const logger = createLogger('dataLayer::insertTodoItem')
const docClient = createDocumentClient()
const todosTable = process.env.TODOS_TABLE

export async function insertTodoItem(item: TodoItem) : Promise<void> {
    logger.debug(`Inserting new TODO item for user ${item.userId}...`)

    await docClient.put({
        TableName: todosTable,
        Item: item
    }).promise()

    logger.debug('Inserted item')
}
