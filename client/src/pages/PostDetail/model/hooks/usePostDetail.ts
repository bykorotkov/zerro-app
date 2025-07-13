import { useGetPostDetailQuery } from "@/pages/PostDetail/api/postDetailApi.ts"

export const usePostDetail = (id: number) => {
    const result = useGetPostDetailQuery(id, {
        skip: !id,
        pollingInterval: 120_000,
    })

    return {
        ...result,
        data: result.data,
        isLoading: result.isLoading,
        isError: result.isError,
        error: result.error,
    }
}
