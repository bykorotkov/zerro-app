import { useEffect, useRef, useState } from "react";
import useVideoThumbnail from "@/shared/lib/hooks/useVideoThumbnails.ts";

export const UseGenerateThumbnail = (userVideo: string) => {
    const [generatedThumbnail, setGeneratedThumbnail] = useState<string | null>(null);
    const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
    const [_, setThumbnailError] = useState<boolean>(false);
    const { generateThumbnail } = useVideoThumbnail();
    const generationAttemptedRef = useRef<boolean>(false);

    useEffect(() => {
        if (isGeneratingThumbnail) return;

        if (generationAttemptedRef.current && userVideo) return;

        if (generatedThumbnail) return;

        // console.log('Starting thumbnail generation for:', userVideo);
        generationAttemptedRef.current = true;
        setIsGeneratingThumbnail(true);

        generateThumbnail(userVideo)
            .then((thumbnail) => {
                // console.log('Thumbnail generated successfully');
                setGeneratedThumbnail(thumbnail);
                setIsGeneratingThumbnail(false);
            })
            .catch((error) => {
                console.error(`Failed to generate thumbnail:`, error);
                setThumbnailError(true);
                setIsGeneratingThumbnail(false);
            });
    }, [userVideo, generateThumbnail, generatedThumbnail, isGeneratingThumbnail]);

    return { generatedThumbnail };
};
