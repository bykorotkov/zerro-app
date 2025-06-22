import { useQuery } from "@tanstack/react-query"
import { UserType } from "@/app/types/global.ts"
import { getUser } from "@/shared/api/userApi.ts"

export const useMainUser = () => {
    return useQuery<UserType>({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const userData = await getUser();
            if (!localStorage.getItem('userId')) {
                localStorage.setItem('userId', userData.id.toString());
            }
            return userData;
        },
    })
}