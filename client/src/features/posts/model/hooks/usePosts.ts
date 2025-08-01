import { useState } from "react"
import type { PostsTypes } from "../../model/types.ts"
import { getPosts } from "../../api/getPosts.ts"

export const usePosts = () => {
    const [posts, setPosts] = useState<PostsTypes[] | []>([])

    const fetchPosts = async () => {
        try {
            const response = await getPosts()
            setPosts(response)
        } catch (e) {
            console.error(`Не удается получить посты`, e)
        }
    }

    return { posts, fetchPosts }
}
