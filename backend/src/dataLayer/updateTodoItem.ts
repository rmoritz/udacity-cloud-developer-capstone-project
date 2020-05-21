import 'source-map-support/register'
import { TodoUpdate } from '../models/TodoUpdate'
import { createDocumentClient } from '../utils/dynamoDb'
import { createLogger } from '../utils/logger'

const logger = createLogger('dataLayer::updateTodoItem')
const docClient = createDocumentClient()
const todosTable = process.env.TODOS_TABLE

export async function updateTodoItem(update: TodoUpdate) : Promise<void> {
    logger.debug(`Updating TODO item ${update.todoId} for user ${update.userId}...`)

    await docClient.update({
        TableName: todosTable,
        Key: {
            todoId: update.todoId,
            userId: update.userId
        },
        UpdateExpression: 'SET #name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeNames: {
            '#name': 'name'
        },
        ExpressionAttributeValues: {
            ':name': update.name,
            ':dueDate': update.dueDate,
            ':done': update.done
        }
    }).promise()

    logger.debug('TODO item updated')
}
