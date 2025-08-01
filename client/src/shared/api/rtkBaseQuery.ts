import $api from "./axios.ts"
import type { AxiosError } from "axios"
import type { BaseQueryFn } from "@reduxjs/toolkit/query"

export const customBaseQuery: BaseQueryFn<{ url: string }, unknown, { status?: number; message: string }> = async (args) => {
    try {
        const response = await $api.get(args.url)
        return { data: response.data }
    } catch (err) {
        const error = err as AxiosError<{
            status?: number
            message: string
        }>

        return {
            error: {
                status: error.response?.status,
                message: error.response?.data?.message || error.message || `Unknown error`,
            },
        }
    }
}
