import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@/shared/api/rtkBaseQuery.ts";
import { BaseUrl } from "@/shared/api/axios.ts";
import type { StoryApiType } from "../model/types/stories.ts";

export const storiesApi = createApi({
    reducerPath: `storiesApi`,
    baseQuery: customBaseQuery(),
    tagTypes: [`Stories`],
    endpoints: (builder) => ({
        getStories: builder.query<StoryApiType[], void>({
            query: () => ({ url: `${BaseUrl}/stories` }),
            providesTags: [`Stories`],
            keepUnusedDataFor: 60,
        }),
        syncStorySeen: builder.mutation<{ storyId: number; seenPartIds: number[] }, { storyId: number; partIds: number[] }>({
            query: ({ storyId, partIds }) => ({
                url: `${BaseUrl}/stories/${storyId}/seen`,
                method: `POST`,
                body: { partIds },
            }),
            async onQueryStarted({ storyId, partIds }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    storiesApi.util.updateQueryData(`getStories`, undefined, (draft) => {
                        const story = draft.find((item) => item.id === storyId);
                        if (!story) return;

                        story.parts = story.parts.map((part) => ({
                            ...part,
                            isSeen: partIds.includes(part.id),
                        }));
                    }),
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const { useGetStoriesQuery, useSyncStorySeenMutation } = storiesApi;
