import '@testing-library/jest-dom';
import {render, screen, fireEvent} from "@testing-library/react";
import Auth from "./Auth.tsx";

jest.mock('./AuthLogin/AuthLogin', () => {
    return jest.fn(({toggleAuthMode}) =>
        <>
            <p>Login Component</p>
            <button onClick={toggleAuthMode}>Switch to registration</button>
        </>
    )
})

jest.mock('./AuthRegistration/AuthRegistration', () => {
    return jest.fn(() => <div>Registration Component</div>)
})

describe('Auth root component logic', () => {
    test('renders AuthLogin by default and toggles to AuthRegistration', () => {
        render(<Auth />)

        expect(screen.getByText(/Login Component/i)).toBeInTheDocument()

        fireEvent.click(screen.getByText(/Switch to registration/i))

        expect(screen.getByText(/Registration Component/i)).toBeInTheDocument()
    })
})