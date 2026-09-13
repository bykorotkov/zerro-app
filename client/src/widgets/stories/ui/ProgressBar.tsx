import type { StoryType } from "@/widgets/stories/model/types/stories.ts";
import classes from "@/widgets/stories/ui/Stories.module.scss";
import { memo, useEffect, useRef } from "react";

const STORY_DURATION_MS = 6000;

interface Props {
    partIndex: number;
    goToNextPart: () => void;
    story: StoryType;
    isPaused: boolean;
}

export const ProgressBar = memo(({ story, goToNextPart, partIndex, isPaused }: Props) => {
    const fillRef = useRef<HTMLDivElement>(null);
    const frameIdRef = useRef<number | null>(null);
    const elapsedRef = useRef(0);

    useEffect(() => {
        elapsedRef.current = 0;
        if (fillRef.current) {
            fillRef.current.style.width = `0%`;
        }
    }, [partIndex]);

    useEffect(() => {
        const cancelFrame = () => {
            if (frameIdRef.current !== null) {
                cancelAnimationFrame(frameIdRef.current);
                frameIdRef.current = null;
            }
        };

        cancelFrame();

        const element = fillRef.current;
        if (!element || isPaused) {
            return cancelFrame;
        }

        const startTime = performance.now() - elapsedRef.current;

        const animate = (timestamp: number) => {
            const elapsed = timestamp - startTime;
            const nextProgress = Math.min((elapsed / STORY_DURATION_MS) * 100, 100);

            element.style.width = `${nextProgress}%`;
            elapsedRef.current = elapsed;

            if (nextProgress >= 100) {
                elapsedRef.current = 0;
                goToNextPart();
                return;
            }

            frameIdRef.current = requestAnimationFrame(animate);
        };

        frameIdRef.current = requestAnimationFrame(animate);

        return cancelFrame;
    }, [goToNextPart, partIndex, isPaused]);

    return (
        <div className={classes.ProgressRow}>
            {story.parts.map((part, idx) => {
                const isActive = partIndex === idx;
                const isFilled = idx < partIndex;
                const status = isFilled ? `done` : isActive ? `active` : `todo`;

                return (
                    <div
                        className={classes.ProgressTrack}
                        key={part.id}
                    >
                        <div
                            key={`${part.id}-${status}`}
                            ref={isActive ? fillRef : undefined}
                            className={classes.ProgressFill}
                            style={{ width: isFilled ? `100%` : `0%` }}
                        />
                    </div>
                );
            })}
        </div>
    );
});
