import { UserType } from "@/app/types/global.ts"

export interface UserProps {
    isLoading: boolean
    error: Error | null
    user?: UserType
}