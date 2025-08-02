import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
    isAuth: boolean
    isLoginMode: boolean
    isLoading: boolean
}

const hasToken = Boolean(localStorage.getItem('token'));

const initialState: AuthState = {
    isAuth: hasToken,
    isLoginMode: true,
    isLoading: !hasToken,
}

const authSlice = createSlice({
    name: `auth`,
    initialState,
    reducers: {
        login(state) {
            state.isAuth = true
            state.isLoading = false
        },
        logout(state) {
            state.isAuth = false
            localStorage.removeItem('token')
        },
        toggleLoginMode(state) {
            state.isLoginMode = !state.isLoginMode
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        },
    },
})

export const { login, logout, toggleLoginMode, setLoading } = authSlice.actions
export default authSlice.reducer
