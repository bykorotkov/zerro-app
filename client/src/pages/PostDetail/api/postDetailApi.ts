import { createApi } from "@reduxjs/toolkit/query/react"
import { BaseUrl } from "@/shared/api/axios"
import type { PostsTypes } from "@/features/posts/model/types"
import { customBaseQuery } from "@/shared/api/rtkBaseQuery.ts"

export const postDetailApi = createApi({
    reducerPath: `postDetailApi`,
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getPostDetail: builder.query<PostsTypes, number>({
            query: (id) => ({ url: `${BaseUrl}/posts/${id}` }),
            keepUnusedDataFor: 60,
        }),
    }),
})

export const { useGetPostDetailQuery } = postDetailApi
