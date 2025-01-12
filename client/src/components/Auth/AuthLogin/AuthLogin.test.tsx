import '@testing-library/jest-dom';
import {render, screen, fireEvent} from "@testing-library/react";
import AuthLogin from "./AuthLogin.tsx";
import {AuthProvider} from "@/context/useAuthContext.tsx";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

describe(('AuthLogin component tests'), () => {
    const mockClick = jest.fn()
    const queryClient = new QueryClient()

    beforeEach(() => {
        render(
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
                        <AuthLogin toggleAuthMode={mockClick} />
                    </BrowserRouter>
                </AuthProvider>
            </QueryClientProvider>
        )
    })

    test('auth login form renders in the document', () => {
        const form = screen.getByTestId('authLoginForm')
        expect(form).toBeInTheDocument()
    })

    test('submit button validates input values and throws some errors', async() => {
        const submitButton = screen.getByRole('button', {name: /Войти/i})
        fireEvent.click(submitButton)
        // const errorFields = await screen.findAllByText(/Поле обязательно для заполнения/i)
        expect(errorFields[0]).toBeInTheDocument()
    })
})