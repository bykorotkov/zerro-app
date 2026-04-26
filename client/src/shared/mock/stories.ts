import userImg1 from "./images/userImg1.jpg";
import userImg2 from "./images/userImg2.jpg";
import userImg3 from "./images/userImg3.jpg";
import userImg4 from "./images/userImg4.jpg";
import videoContent from "./videos/exampleVideo.mp4";
import type { StoryType } from "@/widgets/stories/model/types/stories.ts";

export const mockStories: StoryType[] = [
    {
        id: 1,
        userId: 17,
        username: `Анна`,
        userAvatar: userImg1,
        userVideo: videoContent,
        timestamp: `2025-11-09T12:00:00Z`,
        views: 14,
        isSeen: true,
    },
    {
        id: 2,
        userId: 19,
        username: `Уфси`,
        userAvatar: userImg2,
        userVideo: videoContent,
        timestamp: `2025-11-09T14:30:00Z`,
        views: 44,
        isSeen: false,
    },
    {
        id: 3,
        userId: 21,
        username: `Англия`,
        userAvatar: userImg3,
        userVideo: videoContent,
        timestamp: `2025-11-09T16:00:00Z`,
        views: 98,
        isSeen: false,
    },
    {
        id: 4,
        userId: 29,
        username: `Киномакс`,
        userAvatar: userImg4,
        userVideo: videoContent,
        timestamp: `2025-11-09T18:00:00Z`,
        views: 120,
        isSeen: false,
    },
];
