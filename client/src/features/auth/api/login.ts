import { AuthLoginFormData } from "@/app/types/authTypes.ts"
import { IAuthResponse } from "@/app/types/global.ts"
import $api, { BaseUrl } from "@/shared/api/axios.ts"
import Cookies from "js-cookie"
import axios from "axios"

export const loginUser = async (data: AuthLoginFormData): Promise<IAuthResponse> => {
    try {
        const response = await $api.post(`${BaseUrl}/auth/login`, {...data})
        localStorage.setItem('token', response.data.accessToken)
        Cookies.set('refreshToken', response.data.refreshToken, {secure: true, sameSite: 'None'})

        return response.data
    } catch (e) {
        if (axios.isAxiosError(e) && e.response) {
            const errorData = e.response.data;
            throw new Error(errorData.message || 'Залогиниться не удалось');
        }
        throw new Error('Произошла ошибка при попытке войти');
    }
}