import { useFormik } from "formik"
import type { PostsTypes } from "../types.ts"
import { createPost } from "../../api/createPost.ts"

export const usePostForm = () => {
    const formik = useFormik<PostsTypes>({
        initialValues: {
            title: ``,
            content: ``,
            image: null,
        },
        initialErrors: {
            title: ``,
            content: ``,
            image: ``,
        },
        onSubmit: (values: PostsTypes) => dataToSend(values),
    })
    const dataToSend = async (values: PostsTypes) => {
        const data = new FormData()
        const userId = localStorage.getItem(`userId`)

        data.append(`title`, values.title)
        data.append(`content`, values.content)
        if (userId) {
            data.append(`userId`, userId)
        }
        if (values.image) {
            data.append(`image`, values.image)
        }

        try {
            await createPost(data)
            formik.resetForm()
        } catch (e) {
            console.error(`Не удалось создать пост`, e)
        }
    }

    return { formik }
}
