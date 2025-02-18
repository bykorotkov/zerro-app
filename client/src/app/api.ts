import {IAuthResponse} from "@/types/types.ts";
import axios from "axios"
import {AuthLoginFormData} from "@/types/authTypes.ts";
import $api, {BaseUrl} from "@/app/axios.ts";
import {PostsTypes} from "@/types/posts.ts";
import Cookies from "js-cookie";
import {UserType} from "@/types/global.ts";

const Api = {
    getUsers: async (): Promise<any> => {
        try {
            const response = await $api.get(`${BaseUrl}/users`)
            return response.data
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                const errorData = e.response.data;
                throw new Error(errorData.message || 'Данные пользователей не могут быть показаны')
            }
        }
        throw new Error('Не удалось получить пользователей')
    },
    getUser: async (): Promise<UserType> => {
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
    },
    createPost: async (data: FormData): Promise<IAuthResponse> => {
     try {
         const response = await $api.post(`${BaseUrl}/posts`, data)
         return response.data
     } catch (e) {
         console.log(e)
         throw new Error('Ошибка при создании поста')
     }
    },
    getPosts: async (): Promise<PostsTypes[]> => {
        try {
            const response = await $api.get(`${BaseUrl}/posts`)
            return response.data
        } catch (e) {
            console.log(e)
            throw new Error('Ошибка при получении постов')
        }
    },
    loginUser: async (data: AuthLoginFormData): Promise<IAuthResponse> => {
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
    },
    signUpUser: async (data: AuthLoginFormData): Promise<IAuthResponse> => {
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
    },
    logoutUser: async (): Promise<any> => {
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
}

export const { loginUser, signUpUser, logoutUser, getUsers, getUser, createPost, getPosts } = Api