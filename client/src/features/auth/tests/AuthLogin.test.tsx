import '@testing-library/jest-dom';
import {render, screen, fireEvent} from "@testing-library/react";
import AuthLogin from "../ui/login/AuthLogin.tsx";
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux"
import { setupStore } from "@/app/providers/store/store.ts"

describe(('login component tests'), () => {
    beforeEach(() => {
        const store = setupStore()
        render(
            <Provider store={store}>
                <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
                    <AuthLogin />
                </BrowserRouter>
            </Provider>
        )
    })

    test('auth login form renders in the document', () => {
        const form = screen.getByTestId('authLoginForm')
        expect(form).toBeInTheDocument()
    })

    test('submit button validates input values and throws some errors', async() => {
        const submitButton = screen.getByRole('button', { name: /Войти/i })
        fireEvent.click(submitButton)
        const errorFields = await screen.findAllByText(/Поле обязательно для заполнения/i)
        expect(errorFields[0]).toBeInTheDocument()
    })
})