import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import modalReducer from './reducers/modalSlice'
import { postDetailApi } from "@/pages/PostDetail/api/postDetailApi.ts"

const rootReducer = combineReducers({
    modalReducer,
    [postDetailApi.reducerPath]: postDetailApi.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(postDetailApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']