import { useEffect, useRef } from "react";
import type { StoryType } from "../types/stories";

type Props = {
    onSyncSeenParts: (storyId: number, seenPartIds: number[], isStoryFullySeen: boolean) => void;
    story: StoryType;
    partIndex: number;
};

export const useSyncSeenParts = ({ onSyncSeenParts, story, partIndex }: Props) => {
    const onSyncSeenPartsRef = useRef(onSyncSeenParts);
    onSyncSeenPartsRef.current = onSyncSeenParts;

    const storyPartsRef = useRef(story.parts);
    storyPartsRef.current = story.parts;

    const lastSyncedKeyRef = useRef(``);

    useEffect(() => {
        const parts = storyPartsRef.current;
        const seenPartIds = parts.slice(0, partIndex + 1).map((part) => part.id);
        const syncKey = `${story.id}:${seenPartIds.join(`,`)}`;

        if (lastSyncedKeyRef.current === syncKey) {
            return;
        }

        lastSyncedKeyRef.current = syncKey;
        const isStoryFullySeen = partIndex === parts.length - 1;
        onSyncSeenPartsRef.current(story.id, seenPartIds, isStoryFullySeen);
    }, [partIndex, story.id]);

    return {
        onSyncSeenParts: onSyncSeenPartsRef.current,
        storyParts: storyPartsRef.current,
        lastSyncedKey: lastSyncedKeyRef.current,
    };
};
