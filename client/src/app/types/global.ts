import { PostsTypes } from "@/features/posts/model/types.ts"

export interface UserType {
    id: number
    username: string
    phone: string
    email: string
    password: string
    banned: boolean
    banReason: string
    posts: PostsTypes[]
}

export interface IBaseResponse {
    status: string
    errors?: {
        message: string
        code: number
    }[]
}

export interface IAuthResponse extends IBaseResponse{
    // token: string
    accessToken: string
    refreshToken: string
}