import { UserType } from "@/app/types/global.ts"
import $api, { BaseUrl } from "@/app/axios.ts"
import axios from "axios"

export const getUser = async (): Promise<UserType> => {
    try {
        const response = await $api.get(`${BaseUrl}/users/detail`)
        return response.data
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorData = e.response.data;
            throw new Error(errorData.message || 'Данные пользователей не могут быть показаны')
        }
    }
    throw new Error('Не удалось получить пользователей')
}