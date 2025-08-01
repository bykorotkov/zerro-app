import type { UserType } from "@/app/types/global.ts"

export interface UserProps {
    isLoading: boolean
    error: unknown
    user?: UserType
}
