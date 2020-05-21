import 'source-map-support/register'
import { TodoUpdate } from '../models/TodoUpdate'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

export function createTodoUpdate(userId: string, todoId: string, request: UpdateTodoRequest) 
    : TodoUpdate {
  return {
    userId,
    todoId,
    ...request
  }
}
