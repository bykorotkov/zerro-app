// import $api from "./axios.ts"
// import type { AxiosError } from "axios"
// import type { BaseQueryFn } from "@reduxjs/toolkit/query"
//
// export const customBaseQuery: BaseQueryFn<{ url: string }, unknown, { status?: number; message: string }> = async (args) => {
//     try {
//         const response = await $api.get(args.url)
//         return { data: response.data }
//     } catch (err) {
//         const error = err as AxiosError<{
//             status?: number
//             message: string
//         }>
//
//         return {
//             error: {
//                 status: error.response?.status,
//                 message: error.response?.data?.message || error.message || `Unknown error`,
//             },
//         }
//     }
// }

import $api from "./axios.ts";
import type { AxiosError, AxiosRequestConfig } from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

type AxiosBaseQueryArgs = {
    url: string;
    method?: AxiosRequestConfig["method"];
    body?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
};

type AxiosBaseQueryError = {
    status?: number;
    data?: unknown;
    message?: string;
};

export const customBaseQuery = (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> => {
    return async ({ url, method = "GET", body, params, headers }) => {
        try {
            const result = await $api.request({
                url: baseUrl + url,
                method,
                data: body,
                params,
                headers: {
                    ...headers,
                    // Здесь можно добавить общие заголовки
                },
            });

            return { data: result.data };
        } catch (axiosError) {
            const error = axiosError as AxiosError;
            return {
                error: {
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                },
            };
        }
    };
};