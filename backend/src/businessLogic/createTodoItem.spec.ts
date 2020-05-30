import 'source-map-support/register'
import * as uuid from 'uuid'
import { createTodoItem } from './createTodoItem'
import MockDate from 'mockdate'

const defaultValues = {
  todoId: '01234-56789',
  createdAt: '2020-05-28T12:00:00.000Z',
  done: false,
  attachmentUrl: null
}

jest.mock('uuid')
uuid.v4.mockReturnValue(defaultValues.todoId)
MockDate.set(defaultValues.createdAt)

describe('createTodoItem', () => {
  const req = {
    name: 'Water the flowers',
    dueDate: '2020-06-01 12:00:00'
  }

  const item = createTodoItem('admin', req)

  it('should set default values', () => {    
    expect(item.todoId).toBe(defaultValues.todoId)
    expect(item.createdAt).toBe(defaultValues.createdAt)
    expect(item.done).toBe(defaultValues.done)
    expect(item.attachmentUrl).toBe(defaultValues.attachmentUrl)
  })

  it('should set request values', () => {
    expect(item.name).toBe(req.name)
    expect(item.dueDate).toBe(req.dueDate)
  })
})