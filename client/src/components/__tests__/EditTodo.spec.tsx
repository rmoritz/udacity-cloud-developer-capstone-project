import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { EditTodo } from '../EditTodo'
import { getUploadUrl, uploadFile } from '../../api/todos-api'

jest.mock('../../api/todos-api')

const uploadUrl = 'http://localhost:3000/chucknorris.png'
getUploadUrl.mockResolvedValue(uploadUrl)

const mockUploadFunc = () => Promise.resolve()
uploadFile.mockImplementation(mockUploadFunc)

global.alert = jest.fn()

describe('EditTodo', () => {
    const mockAuth = {
        getIdToken: jest.fn()
    }

    const match = {
        params: {
            todoId: '01234-56789'
        }
    }

    it('calls auth function on click', async () => {
        render(<EditTodo auth={mockAuth} match={match} />)

        const file = new File(['(⌐□_□)'], 'chucknorris.png', {
            type: 'image/png'
        })

        const inputEl = screen.getByPlaceholderText(/^Image to upload$/i)
        fireEvent.change(inputEl, { target: { files: [file] } })

        const buttonEl = screen.getByText(/^Upload$/i)
        fireEvent.click(buttonEl)

        await waitFor(() => expect(uploadFile.mock.calls.length).toBe(1))

        expect(uploadFile.mock.calls[0][0]).toBe(uploadUrl)
    })
})