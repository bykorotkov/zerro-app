import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";
import authReducer from "./reducers/authSlice.ts";
import { postDetailApi } from "@/pages/PostDetail/api/postDetailApi.ts";
import { userApi } from "@/shared/api/userApi.ts";
import { authApi } from "@/features/auth/api/authApi.ts";
import { lessonsApi } from "@/entities/lessons/api/getLessons.ts";
import { storiesApi } from "@/widgets/stories/api/storiesApi.ts";

const rootReducer = combineReducers({
    modalReducer,
    authReducer,
    [postDetailApi.reducerPath]: postDetailApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [lessonsApi.reducerPath]: lessonsApi.reducer,
    [storiesApi.reducerPath]: storiesApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                postDetailApi.middleware,
                userApi.middleware,
                authApi.middleware,
                lessonsApi.middleware,
                storiesApi.middleware,
            ),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore[`dispatch`];
