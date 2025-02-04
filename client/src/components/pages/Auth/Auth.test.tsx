import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import Auth from "./Auth.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "@/context/useAuthContext.tsx";
import {BrowserRouter} from "react-router-dom";

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
    const queryClient = new QueryClient()

    test('renders AuthLogin by default and toggles to AuthRegistration', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <BrowserRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
                        <Auth />
                    </BrowserRouter>
                </AuthProvider>
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(screen.getByText(/Login Component/i)).toBeInTheDocument()
        });

        fireEvent.click(screen.getByText(/Switch to registration/i))

        await waitFor(() => {
            expect(screen.getByText(/Registration Component/i)).toBeInTheDocument();
        });
    })
})