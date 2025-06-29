import { IAuthResponse } from "@/app/types/global.ts"
import $api, { BaseUrl } from "@/shared/api/axios.ts"

export const createPost = async (data: FormData): Promise<IAuthResponse> => {
    try {
        const response = await $api.post(`${BaseUrl}/posts`, data)
        return response.data
    } catch (e) {
        console.log(e)
        throw new Error('Ошибка при создании поста')
    }
}