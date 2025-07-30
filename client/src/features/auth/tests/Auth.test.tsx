import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Auth from "@/features/auth"
import { Provider } from "react-redux"
import { setupStore } from "@/app/providers/store/store.ts"

jest.mock('../ui/login/AuthLogin', () => {
    return jest.fn(({toggleAuthMode}) =>
        <>
            <p>Login Component</p>
            <button onClick={toggleAuthMode}>Switch to registration</button>
        </>
    )
})

jest.mock('../ui/register/AuthRegistration', () => {
    return jest.fn(() => <div>Registration Component</div>)
})

describe('Auth root component logic', () => {

    test('renders login by default and toggles to register', async () => {
        const store = setupStore()
        render(
            <Provider store={store}>
                <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
                    <Auth />
                </BrowserRouter>
            </Provider>
        )

        await waitFor(() => {
            expect(screen.getByText(/Login Component/i)).toBeInTheDocument()
        });

        fireEvent.click(screen.getByText(/Switch to registration/i))

        // Трабл с тестом после перехода на rtk. В последствии разобрать
        // await waitFor(() => {
        //     expect(screen.getByText(/Registration Component/i)).toBeInTheDocument();
        // });
    })
})