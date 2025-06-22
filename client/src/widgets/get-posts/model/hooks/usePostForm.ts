import { useFormik } from "formik"
import { PostsTypes } from "@/widgets/Posts/model/types.ts"
import { createPost } from "@/app/api.ts"

export const usePostForm = () => {
    const formik = useFormik<PostsTypes>({
        initialValues: {
            title: '',
            content: '',
            image: null,
        },
        initialErrors: {
            title: '',
            content: '',
            image: ''
        },
        onSubmit: (values: PostsTypes) => dataToSend(values)
    })
    const dataToSend = async (values: PostsTypes) => {
        const data = new FormData()
        const userId = localStorage.getItem('userId')

        data.append('title', values.title)
        data.append('content', values.content)
        if (userId) {
            data.append('userId', userId)
        }
        if (values.image) {
            data.append('image', values.image);
        }

        try {
            const response = await createPost(data);
            console.log(response);
            formik.resetForm()
        } catch (e) {
            console.error('Не удалось создать пост', e)
        }
    }

    return { formik }
}