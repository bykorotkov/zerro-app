export interface StoryApiType {
    id: number;
    userId: number;
    username: string;
    userAvatar: string;
    createdAt: string;
    updatedAt: string;
    parts: StoryPart[];
}

export interface StoryType {
    id: number;
    userId: number;
    username: string;
    userAvatar: string;
    timestamp: string;
    isSeen: boolean;
    parts: StoryPart[];
}

export interface StoryPart {
    id: number;
    isSeen: boolean;
    username: string;
    userAvatar: string;
    userVideo: string;
    userId: number;
    timestamp: string;
    views: number;
}
