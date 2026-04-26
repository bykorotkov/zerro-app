export class CreateStoryDto {
    readonly userId: number;
    readonly username: string;
    readonly userAvatar: string;
    readonly userVideo: string;
    readonly views?: number;
}
