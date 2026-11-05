import type { StoryPartJson } from "./stories.model";

export type StorySeedInput = {
    username: string;
    avatarFile: string;
    timestamp: string;
    partsCount: number;
    baseViews: number;
};

const SAMPLE_VIDEOS = [
    `https://samplelib.com/mp4/sample-5s-360p.mp4`,
    `https://samplelib.com/mp4/sample-10s-360p.mp4`,
    `https://samplelib.com/mp4/sample-15s-360p.mp4`,
    `https://samplelib.com/mp4/sample-20s-360p.mp4`,
    `https://samplelib.com/mp4/sample-30s-360p.mp4`,
    `https://download.samplelib.com/mp4/sample-5s.mp4`,
    `https://samplelib.com/mp4/sample-5s-360p.mp4`,
] as const;

export const STORY_SEEDS: StorySeedInput[] = [
    { username: `Анна`, avatarFile: `userImg1.jpg`, timestamp: `2025-11-09T18:00:00Z`, partsCount: 5, baseViews: 14 },
    { username: `Уфси`, avatarFile: `userImg2.jpg`, timestamp: `2025-11-09T17:30:00Z`, partsCount: 2, baseViews: 44 },
    { username: `Англия`, avatarFile: `userImg3.jpg`, timestamp: `2025-11-09T16:00:00Z`, partsCount: 1, baseViews: 98 },
    { username: `Киномакс`, avatarFile: `userImg4.jpg`, timestamp: `2025-11-09T19:15:00Z`, partsCount: 3, baseViews: 120 },
    { username: `Мария`, avatarFile: `userImg1.jpg`, timestamp: `2025-11-09T15:00:00Z`, partsCount: 4, baseViews: 67 },
    { username: `Игорь`, avatarFile: `userImg2.jpg`, timestamp: `2025-11-09T20:00:00Z`, partsCount: 7, baseViews: 201 },
    { username: `Лена`, avatarFile: `userImg3.jpg`, timestamp: `2025-11-09T14:00:00Z`, partsCount: 2, baseViews: 33 },
    { username: `Макс`, avatarFile: `userImg4.jpg`, timestamp: `2025-11-09T12:30:00Z`, partsCount: 1, baseViews: 9 },
];

export const buildAvatarUrl = (avatarFile: string): string => {
    const port = process.env.PORT || `5000`;
    return `http://localhost:${port}/stories/${avatarFile}`;
};

export const buildParts = (
    seed: StorySeedInput,
    userId: number,
    avatarUrl: string,
    storyIndex: number,
): StoryPartJson[] => {
    return Array.from({ length: seed.partsCount }, (_, index) => {
        const partTime = new Date(seed.timestamp);
        partTime.setMinutes(partTime.getMinutes() + index * 7);

        return {
            id: index + 1,
            userId,
            username: seed.username,
            userAvatar: avatarUrl,
            userVideo: SAMPLE_VIDEOS[(storyIndex + index) % SAMPLE_VIDEOS.length],
            timestamp: partTime.toISOString(),
            views: seed.baseViews + index * 11,
        };
    });
};
