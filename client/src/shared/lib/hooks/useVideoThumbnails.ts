import { useCallback, useRef } from "react";

const useVideoThumbnail = () => {
    // Используем ref для стабильной функции
    const generateThumbnailRef = useRef(async (videoUrl: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement(`video`);
            const canvas = document.createElement(`canvas`);
            const context = canvas.getContext(`2d`);

            video.src = videoUrl;
            video.crossOrigin = `anonymous`;
            video.muted = true;
            video.preload = `metadata`;

            const cleanup = () => {
                video.removeEventListener(`loadedmetadata`, onLoadedMetadata);
                video.removeEventListener(`seeked`, onSeeked);
                video.removeEventListener(`error`, onError);
                if (timeoutId) clearTimeout(timeoutId);
            };

            const onLoadedMetadata = () => {
                video.currentTime = Math.min(1, video.duration * 0.1);
            };

            const onSeeked = () => {
                if (!context || video.videoWidth === 0 || video.videoHeight === 0) {
                    cleanup();
                    reject(new Error(`Video not ready for thumbnail`));
                    return;
                }

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const thumbnailUrl = canvas.toDataURL(`image/jpeg`, 0.8);
                cleanup();
                resolve(thumbnailUrl);
            };

            const onError = (e: Event) => {
                cleanup();
                reject(new Error(`Failed to load video: ${(e as ErrorEvent).message || `Unknown error`}`));
            };

            video.addEventListener(`loadedmetadata`, onLoadedMetadata);
            video.addEventListener(`seeked`, onSeeked);
            video.addEventListener(`error`, onError);

            const timeoutId: NodeJS.Timeout = setTimeout(() => {
                cleanup();
                reject(new Error(`Thumbnail generation timeout`));
            }, 15000);
        });
    });

    const generateThumbnail = useCallback((videoUrl: string) => {
        return generateThumbnailRef.current(videoUrl);
    }, []);

    return { generateThumbnail };
};

export default useVideoThumbnail;
