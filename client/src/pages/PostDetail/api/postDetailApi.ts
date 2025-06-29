import $api, { BaseUrl } from "@/shared/api/axios.ts"
import { PostsTypes } from "@/features/posts/model/types.ts"

export const getPostDetail = async (id: number): Promise<PostsTypes> => {
    try {
        const response = await $api.get(`${BaseUrl}/posts/${id}`)
        return response.data
    } catch (e) {
        console.log(e)
        throw new Error('Ошибка получения данных для детальной страницы поста')
    }
}