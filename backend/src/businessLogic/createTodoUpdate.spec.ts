import 'source-map-support/register'
import { createTodoUpdate } from './createTodoUpdate'

describe('createTodoUpdate', () => {
  const userId = 'admin'
  const todoId = '01234-56789'

  const req = {
    name: 'Water the flowers',
    dueDate: '2020-06-01 12:00:00',
    done: true
  }

  const update = createTodoUpdate(userId, todoId, req)

  it('should set request values', () => {
    expect(update.userId).toBe(userId)
    expect(update.todoId).toBe(todoId)
    expect(update.name).toBe(req.name)
    expect(update.dueDate).toBe(req.dueDate)
    expect(update.done).toBe(req.done)
  })
})