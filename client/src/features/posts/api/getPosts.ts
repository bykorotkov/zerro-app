import $api, { BaseUrl } from "@/shared/api/axios.ts"
import type { PostsTypes } from "@/features/posts/model/types.ts"

export const getPosts = async (): Promise<PostsTypes[]> => {
    try {
        const response = await $api.get(`${BaseUrl}/posts`)
        return response.data
    } catch (e) {
        console.error(e)
        throw new Error(`Ошибка при получении постов`)
    }
}
