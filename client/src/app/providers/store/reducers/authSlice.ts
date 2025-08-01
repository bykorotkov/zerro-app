import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
    isAuth: boolean
    isLoginMode: boolean
    isLoading: boolean
}

const initialState: AuthState = {
    isAuth: false,
    isLoginMode: true,
    isLoading: true,
}

const authSlice = createSlice({
    name: `auth`,
    initialState,
    reducers: {
        login(state) {
            state.isAuth = true
        },
        logout(state) {
            state.isAuth = false
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
