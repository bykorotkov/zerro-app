import $api, { BaseUrl } from "@/shared/api/axios.ts"
import { PostsTypes } from "@/features/posts/model/types.ts"

export const getPosts = async (): Promise<PostsTypes[]> => {
    try {
        const response = await $api.get(`${BaseUrl}/posts`)
        return response.data
    } catch (e) {
        console.log(e)
        throw new Error('Ошибка при получении постов')
    }
}