import $api, { BaseUrl } from "@/shared/api/axios.ts"
import Cookies from "js-cookie"

export const logoutUser = async (): Promise<any> => {
    try {
        const response = await $api.post(`${BaseUrl}/auth/logout`)
        localStorage.removeItem('token')
        Cookies.remove('refreshToken')

        return response.data
    } catch (e) {
        console.log(e)
        throw new Error('Ошибка выхода')
    }
}