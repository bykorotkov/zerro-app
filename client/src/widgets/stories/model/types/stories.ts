export interface StoryApiType {
    id: number;
    userId: number;
    username: string;
    userAvatar: string;
    userVideo: string;
    views: number;
    createdAt: string;
    updatedAt: string;
}

export interface StoryType {
    id: number;
    userId: number;
    username: string;
    userAvatar: string;
    userVideo: string;
    timestamp: string;
    views: number;
    isSeen: boolean;
}
