
export interface UserType {
    id: number
    username: string
    phone: string
    email: string
    password: string
    banned: boolean
    banReason: string
    posts: string[]
}