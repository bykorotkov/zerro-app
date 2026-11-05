export class CreateStoryDto {
    readonly username: string;
    readonly userAvatar: string;
    readonly parts: Array<{
        id: number;
        userId: number;
        username: string;
        userAvatar: string;
        userVideo: string;
        timestamp: string;
        views?: number;
    }>;
}
