import classes from "./Stories.module.scss";
import { mockStories } from "@/shared/mock/stories.ts";
import { StoriesItem } from "@/widgets/stories/ui/StoriesItem.tsx";
import { useGetStoriesQuery } from "@/widgets/stories/api/storiesApi.ts";
import { useMemo, useState } from "react";
import type { StoryType } from "@/widgets/stories/model/types/stories.ts";
import { StoriesViewer } from "@/widgets/stories/ui/StoriesViewer.tsx";

export const Stories = () => {
    const { data } = useGetStoriesQuery();
    const [seenStoryIds, setSeenStoryIds] = useState<number[]>([]);
    const [viewerIndex, setViewerIndex] = useState<number | null>(null);

    const stories: StoryType[] = useMemo(() => {
        if (data?.length) {
            return data.map((story) => ({
                id: story.id,
                userId: story.userId,
                username: story.username,
                userAvatar: story.userAvatar,
                userVideo: story.userVideo,
                timestamp: story.createdAt,
                views: story.views,
                isSeen: seenStoryIds.includes(story.id),
            }));
        }

        return mockStories.map((story) => ({
            ...story,
            isSeen: seenStoryIds.includes(story.id),
        }));
    }, [data, seenStoryIds]);

    const sortedStories = useMemo(() => {
        return [...stories].sort((a, b) => {
            if (a.isSeen !== b.isSeen) {
                return a.isSeen ? 1 : -1;
            }

            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });
    }, [stories]);

    const markStoryAsSeen = (storyId: number) => {
        setSeenStoryIds((prev) => (prev.includes(storyId) ? prev : [...prev, storyId]));
    };

    return (
        <div className={classes.Container}>
            {sortedStories.map((singleStory, index) => (
                <StoriesItem
                    key={singleStory.id}
                    data={singleStory}
                    onOpen={() => setViewerIndex(index)}
                />
            ))}

            {viewerIndex !== null ? (
                <StoriesViewer
                    stories={sortedStories}
                    initialIndex={viewerIndex}
                    onClose={() => setViewerIndex(null)}
                    onStorySeen={markStoryAsSeen}
                />
            ) : null}
        </div>
    );
};
