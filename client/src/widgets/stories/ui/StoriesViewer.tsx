import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { StoryType } from "@/widgets/stories/model/types/stories.ts";
import classes from "./Stories.module.scss";
import { ProgressBar } from "@/widgets/stories/ui/ProgressBar.tsx";

const HOLD_MS = 200;

interface StoriesViewerProps {
    story: StoryType;
    onClose: () => void;
    onSyncSeenParts: (storyId: number, seenPartIds: number[], isStoryFullySeen: boolean) => void;
}

export const StoriesViewer = memo(({ story, onClose, onSyncSeenParts }: StoriesViewerProps) => {
    const initialIndex = story.parts.findIndex((part) => !part.isSeen);
    const [partIndex, setPartIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
    const [isPaused, setIsPaused] = useState(false);
    const partIndexRef = useRef(partIndex);
    const videoRef = useRef<HTMLVideoElement>(null);
    const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const didHoldRef = useRef(false);
    const pressActiveRef = useRef(false);

    partIndexRef.current = partIndex;

    const activePart = story.parts[partIndex];

    const clearHoldTimer = useCallback(() => {
        if (holdTimerRef.current !== null) {
            clearTimeout(holdTimerRef.current);
            holdTimerRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => clearHoldTimer();
    }, [clearHoldTimer]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPaused) {
            video.pause();
        } else {
            void video.play().catch(() => undefined);
        }
    }, [isPaused, activePart?.id]);

    const goToNextPart = useCallback(() => {
        const currentIndex = partIndexRef.current;

        if (currentIndex >= story.parts.length - 1) {
            onClose();
            return;
        }

        setPartIndex(currentIndex + 1);
    }, [onClose, story.parts.length]);

    const goToPrevPart = useCallback(() => {
        const currentIndex = partIndexRef.current;

        if (currentIndex <= 0) {
            onClose();
            return;
        }

        setPartIndex(currentIndex - 1);
    }, [onClose]);

    const handleNavPointerDown = useCallback(
        (event: ReactPointerEvent<HTMLButtonElement>) => {
            if (event.button !== 0) return;

            pressActiveRef.current = true;
            didHoldRef.current = false;
            clearHoldTimer();
            holdTimerRef.current = setTimeout(() => {
                didHoldRef.current = true;
                setIsPaused(true);
            }, HOLD_MS);
        },
        [clearHoldTimer],
    );

    const endNavPress = useCallback(
        (action: `prev` | `next` | `cancel`) => {
            if (!pressActiveRef.current) return;

            pressActiveRef.current = false;
            clearHoldTimer();

            if (didHoldRef.current) {
                didHoldRef.current = false;
                setIsPaused(false);
                return;
            }

            if (action === `prev`) {
                goToPrevPart();
            } else if (action === `next`) {
                goToNextPart();
            }
        },
        [clearHoldTimer, goToNextPart, goToPrevPart],
    );

    useEffect(() => {
        const seenPartIds = story.parts.slice(0, partIndex + 1).map((part) => part.id);
        const isStoryFullySeen = partIndex === story.parts.length - 1;

        onSyncSeenParts(story.id, seenPartIds, isStoryFullySeen);
    }, [partIndex, story.id, story.parts, onSyncSeenParts]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === `Escape`) {
                onClose();
            }
        };

        window.addEventListener(`keydown`, handleKeyDown);
        return () => window.removeEventListener(`keydown`, handleKeyDown);
    }, [onClose]);

    if (!activePart) {
        return null;
    }

    return (
        <div
            className={classes.ViewerOverlay}
            role="dialog"
            aria-modal="true"
            aria-label={`История ${story.username}`}
        >
            <div className={classes.ViewerPanel}>
                <button
                    type="button"
                    className={classes.CloseButton}
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    ×
                </button>

                <ProgressBar
                    story={story}
                    goToNextPart={goToNextPart}
                    partIndex={partIndex}
                    isPaused={isPaused}
                />

                <video
                    key={activePart.id}
                    ref={videoRef}
                    className={classes.ViewerVideo}
                    src={activePart.userVideo}
                    autoPlay
                    muted
                    playsInline
                />

                <div className={classes.ViewerMeta}>
                    <img
                        src={activePart.userAvatar}
                        alt={activePart.username}
                    />
                    <span>{activePart.username}</span>
                </div>

                <button
                    type="button"
                    className={classes.NavLeft}
                    onPointerDown={handleNavPointerDown}
                    onPointerUp={() => endNavPress(`prev`)}
                    onPointerLeave={() => endNavPress(`cancel`)}
                    onPointerCancel={() => endNavPress(`cancel`)}
                    aria-label="Предыдущая часть"
                />
                <button
                    type="button"
                    className={classes.NavRight}
                    onPointerDown={handleNavPointerDown}
                    onPointerUp={() => endNavPress(`next`)}
                    onPointerLeave={() => endNavPress(`cancel`)}
                    onPointerCancel={() => endNavPress(`cancel`)}
                    aria-label="Следующая часть"
                />
            </div>
        </div>
    );
});
