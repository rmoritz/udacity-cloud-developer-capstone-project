import 'source-map-support/register'
import { AttachmentUrlUpdate } from '../models/attachmentUrlUpdate'
import { createDocumentClient } from '../utils/dynamoDb'
import { createLogger } from '../utils/logger'

const logger = createLogger('dataLayer::updateAttachmentUrl')
const docClient = createDocumentClient()
const todosTable = process.env.TODOS_TABLE

export async function updateAttachmentUrl(update: AttachmentUrlUpdate) : Promise<void> {
    logger.debug(`Updating attachmentUrl for TODO item ${update.todoId} and user ${update.userId}...`)

    await docClient.update({
        TableName: todosTable,
        Key: {
            todoId: update.todoId,
            userId: update.userId
        },
        UpdateExpression: 'SET attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
            ':attachmentUrl': update.attachmentUrl,
        }
    }).promise()

    logger.debug('Updated attachmentUrl')
}
