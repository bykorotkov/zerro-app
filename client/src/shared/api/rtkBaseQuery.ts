import $api from "./axios.ts"
import { AxiosError } from 'axios'
import { BaseQueryFn } from '@reduxjs/toolkit/query'

export const customBaseQuery: BaseQueryFn<
    { url: string },
    unknown,
    { status?: number; message: string }
> = async (args) => {
    try {
        const response = await $api.get(args.url)
        return { data: response.data }
    } catch (err) {
        // Приводим ошибку к типу AxiosError
        const error = err as AxiosError<{
            status?: number
            message: string
        }>

        // Возвращаем в формате, ожидаемом RTK Query
        return {
            error: {
                status: error.response?.status,
                message: error.response?.data?.message || error.message || 'Unknown error'
            }
        }
    }
}