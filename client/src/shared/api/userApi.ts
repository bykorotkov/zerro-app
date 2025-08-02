import { createApi } from "@reduxjs/toolkit/query/react"
import { customBaseQuery } from "@/shared/api/rtkBaseQuery.ts"
import type { UserType } from "@/app/types/global.ts"
import { BaseUrl } from "@/shared/api/axios.ts"

export const userApi = createApi({
    reducerPath: `userApi`,
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        getUser: builder.query<UserType, void>({
            query: () => ({ url: `${BaseUrl}/users/detail` }),
            keepUnusedDataFor: 60,
        }),
    }),
})

export const { useGetUserQuery } = userApi
