import 'source-map-support/register'
import { createDocumentClient } from '../utils/dynamoDb'
import { createLogger } from '../utils/logger'

const logger = createLogger('dataLayer::deleteTodoItem')
const docClient = createDocumentClient()
const todosTable = process.env.TODOS_TABLE

export async function deleteTodoItem(userId: string, todoId: string) : Promise<void> {
    logger.debug(`Deleting TODO item ${todoId} for user ${userId}...`)

    await docClient.delete({
        TableName: todosTable,
        Key: {
            todoId,
            userId
        }
    }).promise()

    logger.debug('Deleted TODO item', todoId)
}
