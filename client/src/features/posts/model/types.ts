export interface PostsTypes {
    title: string
    content: string
    image: string | null
    id?: number
    createdAt?: Date
    userId?: number
    author?: PostAuthor
}

export interface PostAuthor {
    id: number
    banned: boolean
    banReason?: string
    createdAt: string
    email: string
    phone: string
    updatedAt: string
    username: string
}

export interface PostItemProps {
    post: PostsTypes
}

export interface PostFormProps {
    fetchPosts: () => void
}

export interface PostListProps {
    posts: PostsTypes[]
}
