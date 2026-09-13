import userImg1 from "./images/userImg1.jpg";
import userImg2 from "./images/userImg2.jpg";
import userImg3 from "./images/userImg3.jpg";
import userImg4 from "./images/userImg4.jpg";
import localVideo from "./videos/exampleVideo.mp4";
import type { StoryPart, StoryType } from "@/widgets/stories/model/types/stories.ts";

const avatars = [userImg1, userImg2, userImg3, userImg4] as const;

/**
 * SampleLib (samplelib.com/ru) — российский каталог тестовых MP4.
 * Важно: у ссылок есть Access-Control-Allow-Origin: *, иначе canvas-превью не строится.
 */
const sampleVideos = [
    localVideo,
    `https://samplelib.com/mp4/sample-5s-360p.mp4`,
    `https://samplelib.com/mp4/sample-10s-360p.mp4`,
    `https://samplelib.com/mp4/sample-15s-360p.mp4`,
    `https://samplelib.com/mp4/sample-20s-360p.mp4`,
    `https://samplelib.com/mp4/sample-30s-360p.mp4`,
    `https://download.samplelib.com/mp4/sample-5s.mp4`,
] as const;

type MockStorySeed = {
    id: number;
    userId: number;
    username: string;
    avatarIndex: 0 | 1 | 2 | 3;
    timestamp: string;
    partsCount: number;
    baseViews: number;
};

const createParts = (seed: MockStorySeed): StoryPart[] => {
    const avatar = avatars[seed.avatarIndex];

    return Array.from({ length: seed.partsCount }, (_, index) => {
        const partNumber = index + 1;
        const partTime = new Date(seed.timestamp);
        partTime.setMinutes(partTime.getMinutes() + index * 7);

        return {
            id: partNumber,
            userId: seed.userId,
            username: seed.username,
            userAvatar: avatar,
            userVideo: sampleVideos[(seed.id + index) % sampleVideos.length],
            timestamp: partTime.toISOString(),
            views: seed.baseViews + index * 11,
            isSeen: false,
        };
    });
};

const createStory = (seed: MockStorySeed): StoryType => ({
    id: seed.id,
    userId: seed.userId,
    username: seed.username,
    userAvatar: avatars[seed.avatarIndex],
    timestamp: seed.timestamp,
    isSeen: false,
    parts: createParts(seed),
});

/**
 * Тестовые сценарии:
 * - 1 часть / 2 / 3 / 5 / 7 — проверка next/prev и progress segments
 * - разные timestamps — сортировка «новее выше»
 * - разные video URL по частям — видно, что медиа реально переключается
 * - 8 пользователей — скролл strip и сортировка после seen
 */
const storySeeds: MockStorySeed[] = [
    {
        id: 1,
        userId: 17,
        username: `Анна`,
        avatarIndex: 0,
        timestamp: `2025-11-09T18:00:00Z`,
        partsCount: 5,
        baseViews: 14,
    },
    {
        id: 2,
        userId: 19,
        username: `Уфси`,
        avatarIndex: 1,
        timestamp: `2025-11-09T17:30:00Z`,
        partsCount: 2,
        baseViews: 44,
    },
    {
        id: 3,
        userId: 21,
        username: `Англия`,
        avatarIndex: 2,
        timestamp: `2025-11-09T16:00:00Z`,
        partsCount: 1,
        baseViews: 98,
    },
    {
        id: 4,
        userId: 29,
        username: `Киномакс`,
        avatarIndex: 3,
        timestamp: `2025-11-09T19:15:00Z`,
        partsCount: 3,
        baseViews: 120,
    },
    {
        id: 5,
        userId: 31,
        username: `Мария`,
        avatarIndex: 0,
        timestamp: `2025-11-09T15:00:00Z`,
        partsCount: 4,
        baseViews: 67,
    },
    {
        id: 6,
        userId: 33,
        username: `Игорь`,
        avatarIndex: 1,
        timestamp: `2025-11-09T20:00:00Z`,
        partsCount: 7,
        baseViews: 201,
    },
    {
        id: 7,
        userId: 35,
        username: `Лена`,
        avatarIndex: 2,
        timestamp: `2025-11-09T14:00:00Z`,
        partsCount: 2,
        baseViews: 33,
    },
    {
        id: 8,
        userId: 37,
        username: `Макс`,
        avatarIndex: 3,
        timestamp: `2025-11-09T12:30:00Z`,
        partsCount: 1,
        baseViews: 9,
    },
];

export const mockStories: StoryType[] = storySeeds.map(createStory);
