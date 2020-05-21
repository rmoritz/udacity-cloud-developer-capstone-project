import 'source-map-support/register'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { TodoItem } from '../models/TodoItem'
import * as uuid from 'uuid'

export function createTodoItem(userId: string, request: CreateTodoRequest) : TodoItem {
    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()
    const done = false
    const attachmentUrl = null
  
    return {
      todoId,
      createdAt,
      done,
      attachmentUrl,
      userId,
      ...request
    }
}

