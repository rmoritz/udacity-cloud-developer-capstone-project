import 'source-map-support/register'
import { createAttachmentUrlUpdate } from './createAttachmentUrlUpdate'

describe('createAttachmentUrlUpdate', () => {
  const userId = 'admin'
  const todoId = '01234-56789'
  const attachmentUrl = 'http://localhost/files/01234-56789.png'

  const update = createAttachmentUrlUpdate(userId, todoId, attachmentUrl)

  it('should set request values', () => {
    expect(update.userId).toBe(userId)
    expect(update.todoId).toBe(todoId)
    expect(update.attachmentUrl).toBe(attachmentUrl)
  })
})