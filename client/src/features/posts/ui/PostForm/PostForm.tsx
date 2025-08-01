import classes from "../Posts.module.scss"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { usePostForm } from "../../model/hooks/usePostForm.ts"
import type { PostFormProps } from "@/features/posts/model/types.ts"

export const PostForm = ({ fetchPosts }: PostFormProps) => {
    const { formik } = usePostForm()

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={classes.Wrap}
        >
            <h2>Для создания поста введите следующие данные</h2>
            <div className={classes.Inputs}>
                <div className={classes.InputItem}>
                    <Input
                        className={classes.Input}
                        type="text"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        placeholder="введите название..."
                    />
                    {formik.errors.title && formik.touched.title ? <p className={classes.Caption}>{formik.errors.title}</p> : null}
                </div>

                <div className={classes.InputItem}>
                    <Input
                        className={classes.Input}
                        type="text"
                        id="content"
                        name="content"
                        value={formik.values.content}
                        onChange={formik.handleChange}
                        placeholder="опишите контент..."
                    />
                    {formik.errors.content && formik.touched.content ? <p className={classes.Caption}>{formik.errors.content}</p> : null}
                </div>

                <div className={classes.InputItem}>
                    <Input
                        className={classes.Input}
                        type="file"
                        id="image"
                        name="image"
                        onChange={(event) => {
                            const image = event.currentTarget.files ? event.currentTarget.files[0] : null
                            formik.setFieldValue(`image`, image)
                        }}
                        placeholder="загрузите файл..."
                    />
                    {formik.errors.image && formik.touched.image ? <p className={classes.Caption}>{formik.errors.image}</p> : null}
                </div>
            </div>

            <div className={classes.Buttons}>
                <Button type="submit">Создать пост</Button>
                <Button
                    type="button"
                    className={classes.Button}
                    onClick={fetchPosts}
                >
                    Получить посты
                </Button>
            </div>
        </form>
    )
}
