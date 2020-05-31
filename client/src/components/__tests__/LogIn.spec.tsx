import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { LogIn } from '../LogIn'

describe('Login', () => {
    const mockAuth = {
        login: jest.fn()
    }

    it('calls auth function on click', () => {
        render(<LogIn auth={mockAuth} />)

        fireEvent.click(screen.getByText(/^Log in$/i))

        expect(mockAuth.login.mock.calls.length).toBe(1)
    })
})