import { AuthLoginFormData } from "@/app/types/authTypes.ts"
import { IAuthResponse } from "@/app/types/global.ts"
import $api, { BaseUrl } from "@/shared/api/axios.ts"
import axios from "axios"

export const signUpUser = async (data: AuthLoginFormData): Promise<IAuthResponse> => {
    try {
        const response = await $api.post(`${BaseUrl}/auth/registration`, {...data})
        return response.data
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorData = e.response.data;
            throw new Error(errorData.message || 'Регистрация не удалась');
        }
        throw new Error('Произошла ошибка при регистрации');
    }
}