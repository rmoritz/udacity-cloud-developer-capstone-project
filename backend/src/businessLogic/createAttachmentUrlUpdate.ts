import 'source-map-support/register'
import { AttachmentUrlUpdate } from '../models/attachmentUrlUpdate'

export function createAttachmentUrlUpdate(userId: string, todoId: string, attachmentUrl: string) 
    : AttachmentUrlUpdate {
  return {
    userId,
    todoId,
    attachmentUrl
  }
}