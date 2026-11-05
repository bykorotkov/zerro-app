import type { StoryEntryMode, StoryType } from "@/widgets/stories/model/types/stories.ts";
import { ProgressBar } from "@/widgets/stories/ui/ProgressBar.tsx";
import type { PointerEvent as ReactPointerEvent } from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSyncSeenParts } from "../model/hooks/useSyncSeenParts";
import classes from "./Stories.module.scss";

const HOLD_MS = 200;
const SWIPE_THRESHOLD_PX = 56;

interface StoriesViewerProps {
    story: StoryType;
    entryMode: StoryEntryMode;
    onClose: () => void;
    onNextStory: () => void;
    onPrevStory: () => void;
    onSyncSeenParts: (storyId: number, seenPartIds: number[], isStoryFullySeen: boolean) => void;
}

export const StoriesViewer = memo(({ story, entryMode, onClose, onNextStory, onPrevStory, onSyncSeenParts }: StoriesViewerProps) => {
    const initialIndex =
        entryMode === `end`
            ? Math.max(story.parts.length - 1, 0)
            : (() => {
                  const firstUnseen = story.parts.findIndex((part) => !part.isSeen);
                  return firstUnseen >= 0 ? firstUnseen : 0;
              })();

    const [partIndex, setPartIndex] = useState(initialIndex);
    const [isPaused, setIsPaused] = useState(false);
    const partIndexRef = useRef(partIndex);
    const videoRef = useRef<HTMLVideoElement>(null);
    const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const didHoldRef = useRef(false);
    const pressActiveRef = useRef(false);
    const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
    const isSwipeRef = useRef(false);

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
            onNextStory();
            return;
        }

        setPartIndex(currentIndex + 1);
    }, [onNextStory, story.parts.length]);

    const goToPrevPart = useCallback(() => {
        const currentIndex = partIndexRef.current;

        if (currentIndex <= 0) {
            onPrevStory();
            return;
        }

        setPartIndex(currentIndex - 1);
    }, [onPrevStory]);

    const handleNavPointerDown = useCallback(
        (event: ReactPointerEvent<HTMLButtonElement>) => {
            if (event.button !== 0) return;

            pressActiveRef.current = true;
            didHoldRef.current = false;
            isSwipeRef.current = false;
            pointerStartRef.current = { x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);

            clearHoldTimer();
            holdTimerRef.current = setTimeout(() => {
                if (isSwipeRef.current) return;
                didHoldRef.current = true;
                setIsPaused(true);
            }, HOLD_MS);
        },
        [clearHoldTimer],
    );

    const handleNavPointerMove = useCallback(
        (event: ReactPointerEvent<HTMLButtonElement>) => {
            if (!pressActiveRef.current || !pointerStartRef.current || isSwipeRef.current) return;

            const dx = event.clientX - pointerStartRef.current.x;
            const dy = event.clientY - pointerStartRef.current.y;

            if (Math.hypot(dx, dy) < SWIPE_THRESHOLD_PX) return;

            isSwipeRef.current = true;
            clearHoldTimer();

            if (didHoldRef.current) {
                didHoldRef.current = false;
                setIsPaused(false);
            }
        },
        [clearHoldTimer],
    );

    const endNavPress = useCallback(
        (action: `prev` | `next` | `cancel`, event?: ReactPointerEvent<HTMLButtonElement>) => {
            if (!pressActiveRef.current) return;

            pressActiveRef.current = false;
            clearHoldTimer();

            if (event?.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
            }

            if (isSwipeRef.current && pointerStartRef.current && event) {
                const dx = event.clientX - pointerStartRef.current.x;
                const dy = event.clientY - pointerStartRef.current.y;
                const absX = Math.abs(dx);
                const absY = Math.abs(dy);

                pointerStartRef.current = null;
                isSwipeRef.current = false;
                didHoldRef.current = false;
                setIsPaused(false);

                if (absY > absX && dy > 0) {
                    onClose();
                    return;
                }

                if (absX >= absY) {
                    if (dx < 0) {
                        onNextStory();
                    } else {
                        onPrevStory();
                    }
                }

                return;
            }

            pointerStartRef.current = null;
            isSwipeRef.current = false;

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
        [clearHoldTimer, goToNextPart, goToPrevPart, onClose, onNextStory, onPrevStory],
    );

    useSyncSeenParts({ onSyncSeenParts, story, partIndex });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === `Escape`) {
                onClose();
                return;
            }

            if (event.key === `ArrowRight`) {
                event.preventDefault();
                goToNextPart();
                return;
            }

            if (event.key === `ArrowLeft`) {
                event.preventDefault();
                goToPrevPart();
                return;
            }

            if (event.key === ` ` || event.code === `Space`) {
                event.preventDefault();
                setIsPaused((prev) => !prev);
            }
        };

        window.addEventListener(`keydown`, handleKeyDown);
        return () => window.removeEventListener(`keydown`, handleKeyDown);
    }, [onClose, goToNextPart, goToPrevPart]);

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
                    onPointerMove={handleNavPointerMove}
                    onPointerUp={(event) => endNavPress(`prev`, event)}
                    onPointerCancel={(event) => endNavPress(`cancel`, event)}
                    aria-label="Предыдущая часть"
                />
                <button
                    type="button"
                    className={classes.NavRight}
                    onPointerDown={handleNavPointerDown}
                    onPointerMove={handleNavPointerMove}
                    onPointerUp={(event) => endNavPress(`next`, event)}
                    onPointerCancel={(event) => endNavPress(`cancel`, event)}
                    aria-label="Следующая часть"
                />
            </div>
        </div>
    );
});
