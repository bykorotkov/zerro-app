import { PostsTypes } from "@/widgets/get-posts/model/types.ts"
import $api, { BaseUrl } from "@/shared/api/axios.ts"

export const getPostDetail = async (id: number): Promise<PostsTypes> => {
    try {
        const response = await $api.get(`${BaseUrl}/posts/${id}`)
        return response.data
    } catch (e) {
        console.log(e)
        throw new Error('Ошибка получения данных для детальной страницы поста')
    }
}