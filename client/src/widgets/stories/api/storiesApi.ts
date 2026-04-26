import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@/shared/api/rtkBaseQuery.ts";
import { BaseUrl } from "@/shared/api/axios.ts";
import type { StoryApiType } from "../model/types/stories.ts";

export const storiesApi = createApi({
    reducerPath: `storiesApi`,
    baseQuery: customBaseQuery(),
    endpoints: (builder) => ({
        getStories: builder.query<StoryApiType[], void>({
            query: () => ({ url: `${BaseUrl}/stories` }),
            keepUnusedDataFor: 60,
        }),
    }),
});

export const { useGetStoriesQuery } = storiesApi;
