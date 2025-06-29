import { useQuery } from "@tanstack/react-query"
import { getPostDetail } from "@/pages/PostDetail/api/postDetailApi.ts"
import { PostsTypes } from "@/features/posts/model/types.ts"

export const usePostDetail = (id?: string) => {
    return useQuery<PostsTypes, Error>({
        queryKey: ["post", id],
        queryFn: () => {
            if (!id) throw new Error("ID поста не указан")
            return getPostDetail(Number(id))
        },
        staleTime: 60_000, // Данные "свежие" 60 секунд
        retry: 2, // 2 попытки при ошибке
        retryDelay: 120_000, // Фиксированная задержка 2 минуты (120 000 мс)
        enabled: !!id
    })
}
