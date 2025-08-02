import { createApi } from "@reduxjs/toolkit/query/react"
import type { IAuthResponse } from "@/app/types/global.ts"
import type { AuthLoginFormData } from "@/app/types/authTypes.ts"
import Cookies from "js-cookie"
import { BaseUrl } from "@/shared/api/axios.ts"
import { customBaseQuery } from "@/shared/api/rtkBaseQuery.ts"

export const authApi = createApi({
    reducerPath: `authApi`,
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, AuthLoginFormData>({
            query: (values) => ({
                url: `${BaseUrl}/auth/login`,
                method: `POST`,
                body: values,
            }),
            transformResponse: (response: IAuthResponse) => {
                localStorage.setItem(`token`, response.accessToken)
                Cookies.set(`refreshToken`, response.refreshToken, { secure: true, sameSite: `None` })
                return response
            },
        }),
        registration: builder.mutation<IAuthResponse, AuthLoginFormData>({
            query: (values) => ({
                url: `${BaseUrl}/auth/registration`,
                method: `POST`,
                body: values,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${BaseUrl}/auth/logout`,
                method: `POST`,
            }),
            transformResponse: (response) => {
                localStorage.removeItem(`token`)
                Cookies.remove(`refreshToken`)
                return response
            },
        }),
    }),
})

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } = authApi
