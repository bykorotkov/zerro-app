import axios from "axios";
import {IAuthResponse} from "@/types/types.ts";
import Cookies from "js-cookie";

export const BaseUrl = 'http://localhost:5000'

const logout = async (): Promise<any> => {
    try {
        const response = await axios.post<IAuthResponse>(`${BaseUrl}/auth/logout`, {}, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${Cookies.get('refreshToken')}`
            }
        })
        localStorage.removeItem('token')
        Cookies.remove('refreshToken')

        return response.data
    } catch (e) {
        console.log('Ошибка выхода из личного кабинета', e)
    }
}

const $api = axios.create({
    baseURL: BaseUrl,
    withCredentials: true
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post<IAuthResponse>(`${BaseUrl}/auth/refresh`, {}, {
                withCredentials: true
            })
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Пользователь не авторизован', e)
            await logout()
        }
    }

    throw new Error('Пользователь не авторизован')
})

export default $api;