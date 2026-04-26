import { useCallback, useEffect, useRef, useState } from "react";
import type { StoryType } from "@/widgets/stories/model/types/stories.ts";
import classes from "./Stories.module.scss";

interface StoriesViewerProps {
    stories: StoryType[];
    initialIndex: number;
    onClose: () => void;
    onStorySeen: (storyId: number) => void;
}

const STORY_DURATION_MS = 6000;

export const StoriesViewer = ({ stories, initialIndex, onClose, onStorySeen }: StoriesViewerProps) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [progress, setProgress] = useState(0);
    const frameRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    const activeStory = stories[activeIndex];

    const goToNextStory = useCallback(() => {
        if (activeIndex >= stories.length - 1) {
            onClose();
            return;
        }
        setActiveIndex((prev) => prev + 1);
    }, [onClose, setActiveIndex, activeIndex, stories.length]);

    const goToPrevStory = () => {
        if (activeIndex === 0) {
            return;
        }
        setActiveIndex((prev) => prev - 1);
    };

    useEffect(() => {
        if (!activeStory) {
            return;
        }

        onStorySeen(activeStory.id);
        setProgress(0);
        startTimeRef.current = performance.now();

        const animate = (timestamp: number) => {
            const elapsed = timestamp - startTimeRef.current;
            const nextProgress = Math.min((elapsed / STORY_DURATION_MS) * 100, 100);
            setProgress(nextProgress);

            if (nextProgress >= 100) {
                goToNextStory();
                return;
            }

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [activeIndex, activeStory?.id, activeStory, goToNextStory, onStorySeen]);

    if (!activeStory) {
        return null;
    }

    return (
        <div className={classes.ViewerOverlay}>
            <div className={classes.ViewerPanel}>
                <button
                    type="button"
                    className={classes.CloseButton}
                    onClick={onClose}
                >
                    x
                </button>

                <div className={classes.ProgressRow}>
                    {stories.map((story) => {
                        // const currentProgress = index < activeIndex ? 100 : index === activeIndex ? progress : 0;
                        return (
                            <div
                                className={classes.ProgressTrack}
                                key={story.id}
                            >
                                <div
                                    className={classes.ProgressFill}
                                    style={{ width: `${Math.floor(progress)}%` }}
                                />
                            </div>
                        );
                    })}
                </div>

                <video
                    className={classes.ViewerVideo}
                    src={activeStory.userVideo}
                    autoPlay
                    muted
                    playsInline
                />

                <div className={classes.ViewerMeta}>
                    <img
                        src={activeStory.userAvatar}
                        alt={activeStory.username}
                    />
                    <span>{activeStory.username}</span>
                </div>

                <button
                    type="button"
                    className={classes.NavLeft}
                    onClick={goToPrevStory}
                />
                <button
                    type="button"
                    className={classes.NavRight}
                    onClick={goToNextStory}
                />
            </div>
        </div>
    );
};
