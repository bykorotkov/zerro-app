import { useGetStoriesQuery, useSyncStorySeenMutation } from "@/widgets/stories/api/storiesApi.ts";
import type { StoryApiType, StoryEntryMode, StoryPart, StoryType } from "@/widgets/stories/model/types/stories.ts";
import { StoriesItem } from "@/widgets/stories/ui/StoriesItem.tsx";
import { StoriesViewer } from "@/widgets/stories/ui/StoriesViewer.tsx";
import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./Stories.module.scss";

const mapApiStories = (data: StoryApiType[]): StoryType[] => {
    return data.map((story: StoryApiType): StoryType => {
        const parts: StoryPart[] = story.parts.map((part: StoryPart) => ({
            ...part,
            isSeen: Boolean(part.isSeen),
        }));
        const isSeen = parts.length > 0 && parts.every((part: StoryPart) => part.isSeen);

        return {
            id: story.id,
            userId: story.userId,
            username: story.username,
            userAvatar: story.userAvatar,
            timestamp: story.createdAt,
            isSeen,
            parts,
        };
    });
};

const sortStories = (list: StoryType[]) => {
    return [...list].sort((a, b) => {
        if (a.isSeen !== b.isSeen) {
            return a.isSeen ? 1 : -1;
        }

        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
};

export const Stories = () => {
    const { data, isLoading, isError } = useGetStoriesQuery();
    const [syncStorySeen] = useSyncStorySeenMutation();
    const [viewerStoryId, setViewerStoryId] = useState<number | null>(null);
    const [entryMode, setEntryMode] = useState<StoryEntryMode>(`start`);
    const [stories, setStories] = useState<StoryType[]>([]);
    const storiesRef = useRef(stories);
    const viewerStoryIdRef = useRef(viewerStoryId);

    storiesRef.current = stories;
    viewerStoryIdRef.current = viewerStoryId;

    useEffect(() => {
        if (!data) {
            setStories([]);
            return;
        }

        // Пока viewer открыт — не пересобираем список из API (иначе цикл seen → cache → effect)
        if (viewerStoryId !== null) {
            return;
        }

        setStories(sortStories(mapApiStories(data)));
    }, [data, viewerStoryId]);

    const syncSeenParts = useCallback(
        (storyId: number, seenPartIds: number[], _isStoryFullySeen: boolean) => {
            setStories((prev) =>
                prev.map((story) => {
                    if (story.id !== storyId) {
                        return story;
                    }

                    const parts = story.parts.map((part) => ({
                        ...part,
                        isSeen: seenPartIds.includes(part.id),
                    }));
                    const isSeen = parts.length > 0 && parts.every((part) => part.isSeen);

                    return { ...story, parts, isSeen };
                }),
            );

            void syncStorySeen({ storyId, partIds: seenPartIds });
        },
        [syncStorySeen],
    );

    const openStory = useCallback((storyId: number, mode: StoryEntryMode = `start`) => {
        setEntryMode(mode);
        setViewerStoryId(storyId);
    }, []);

    const closeViewer = useCallback(() => {
        setViewerStoryId(null);
    }, []);

    const goToAdjacentStory = useCallback(
        (direction: `next` | `prev`) => {
            const currentId = viewerStoryIdRef.current;
            if (currentId === null) return;

            const list = storiesRef.current;
            const currentIndex = list.findIndex((story) => story.id === currentId);
            if (currentIndex < 0) return;

            const nextIndex = direction === `next` ? currentIndex + 1 : currentIndex - 1;

            if (nextIndex < 0 || nextIndex >= list.length) {
                closeViewer();
                return;
            }

            openStory(list[nextIndex].id, direction === `next` ? `start` : `end`);
        },
        [closeViewer, openStory],
    );

    const handleNextStory = useCallback(() => {
        goToAdjacentStory(`next`);
    }, [goToAdjacentStory]);

    const handlePrevStory = useCallback(() => {
        goToAdjacentStory(`prev`);
    }, [goToAdjacentStory]);

    const activeStory = viewerStoryId !== null ? stories.find((story) => story.id === viewerStoryId) : undefined;

    if (isLoading) {
        return null;
    }

    if (isError || stories.length === 0) {
        return null;
    }

    return (
        <div className={classes.Container}>
            {stories.map((singleStory) => (
                <StoriesItem
                    key={singleStory.id}
                    data={singleStory}
                    onOpen={() => openStory(singleStory.id, `start`)}
                />
            ))}

            {activeStory ? (
                <StoriesViewer
                    key={activeStory.id}
                    story={activeStory}
                    entryMode={entryMode}
                    onClose={closeViewer}
                    onNextStory={handleNextStory}
                    onPrevStory={handlePrevStory}
                    onSyncSeenParts={syncSeenParts}
                />
            ) : null}
        </div>
    );
};
