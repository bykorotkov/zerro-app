import { mockStories } from "@/shared/mock/stories.ts";
import { useGetStoriesQuery } from "@/widgets/stories/api/storiesApi.ts";
import type { StoryType } from "@/widgets/stories/model/types/stories.ts";
import { StoriesItem } from "@/widgets/stories/ui/StoriesItem.tsx";
import { StoriesViewer } from "@/widgets/stories/ui/StoriesViewer.tsx";
import { useCallback, useEffect, useState } from "react";
import classes from "./Stories.module.scss";

export const Stories = () => {
    const { data } = useGetStoriesQuery();
    const [seenStoryIds, setSeenStoryIds] = useState<number[]>([]);
    const [seenPartIdsByStory, setSeenPartIdsByStory] = useState<Record<number, number[]>>({});
    const [viewerStoryId, setViewerStoryId] = useState<number | null>(null);
    const [stories, setStories] = useState<StoryType[]>([]);

    useEffect(() => {
        const mapParts = (storyId: number, parts: StoryType[`parts`]) => {
            const seenPartIds = seenPartIdsByStory[storyId] ?? [];

            return parts.map((part) => ({
                ...part,
                isSeen: seenPartIds.includes(part.id),
            }));
        };

        let rawStories: StoryType[];

        if (data) {
            rawStories = data.map((story) => ({
                id: story.id,
                userId: story.userId,
                username: story.username,
                userAvatar: story.userAvatar,
                timestamp: story.createdAt,
                isSeen: seenStoryIds.includes(story.id),
                parts: mapParts(story.id, story.parts),
            }));
        } else {
            rawStories = mockStories.map((story) => ({
                ...story,
                isSeen: seenStoryIds.includes(story.id),
                parts: mapParts(story.id, story.parts),
            }));
        }

        if (viewerStoryId !== null) {
            setStories(rawStories);
            return;
        }

        const sorted = [...rawStories].sort((a, b) => {
            if (a.isSeen !== b.isSeen) {
                return a.isSeen ? 1 : -1;
            }

            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });

        setStories(sorted);
    }, [data, seenStoryIds, seenPartIdsByStory, viewerStoryId]);

    const syncSeenParts = useCallback((storyId: number, seenPartIds: number[], isStoryFullySeen: boolean) => {
        setSeenPartIdsByStory((prev) => {
            const previous = prev[storyId] ?? [];
            const sameLength = previous.length === seenPartIds.length;
            const sameIds = sameLength && previous.every((id, index) => id === seenPartIds[index]);

            if (sameIds) {
                return prev;
            }

            return {
                ...prev,
                [storyId]: seenPartIds,
            };
        });

        setSeenStoryIds((prev) => {
            const alreadySeen = prev.includes(storyId);

            if (isStoryFullySeen) {
                return alreadySeen ? prev : [...prev, storyId];
            }

            return alreadySeen ? prev.filter((id) => id !== storyId) : prev;
        });
    }, []);

    const activeStory = viewerStoryId !== null ? stories.find((story) => story.id === viewerStoryId) : undefined;

    return (
        <div className={classes.Container}>
            {stories.map((singleStory) => (
                <StoriesItem
                    key={singleStory.id}
                    data={singleStory}
                    onOpen={() => setViewerStoryId(singleStory.id)}
                />
            ))}

            {activeStory ? (
                <StoriesViewer
                    key={activeStory.id}
                    story={activeStory}
                    onClose={() => setViewerStoryId(null)}
                    onSyncSeenParts={syncSeenParts}
                />
            ) : null}
        </div>
    );
};
