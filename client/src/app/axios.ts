import axios from "axios";
import {IAuthResponse} from "@/types/types.ts";

export const BaseUrl = 'http://localhost:5000'

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
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            localStorage.setItem('token', response.data.token)
            return $api.request(originalRequest)
        } catch (e) {
            console.log('Пользователь не авторизован', e)
        }
    }

    throw new Error('Пользователь не авторизован')
})

export default $api;