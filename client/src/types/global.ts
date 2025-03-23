import {PostsTypes} from "@/types/posts.ts";

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