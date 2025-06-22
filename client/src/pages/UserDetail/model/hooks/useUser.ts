import { useQuery } from "@tanstack/react-query"
import { UserType } from "@/app/types/global.ts"
import { getUser } from "@/shared/api/userApi.ts"

export const useUser = () => {
    return useQuery<UserType>({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 5 * 60 * 1000,
    })
}