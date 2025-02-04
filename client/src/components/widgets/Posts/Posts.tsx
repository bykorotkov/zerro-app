import {useFormik} from "formik";
import {PostsTypes} from "@/types/posts.ts";
import Input from "@/components/ui/Input/Input.tsx";
import classes from './Posts.module.scss'
import Button from "@/components/ui/Button/Button.tsx";
import {createPost, getPosts} from "@/app/api.ts";
import {useState} from "react";

const Posts = () => {
    const [posts, setPosts] = useState<PostsTypes[] | []>([])
    const formik = useFormik<PostsTypes>({
        initialValues: {
            title: '',
            content: '',
            image: null
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

        data.append('title', values.title)
        data.append('content', values.content)
        data.append('userId', '24')
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

    const getPostsFunc = async () => {
        try {
            const response = await getPosts()
            console.log(response)
            setPosts(response)
        } catch (e) {
            console.error('Не удается получить посты', e)
        }
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={classes.Wrap}>
                <h2>Для создания поста введите следующие данные</h2>
                <div  className={classes.Inputs}>
                    <div className={classes.InputItem}>
                        <Input className={classes.Input} type={'text'} id={'title'} name={'title'} value={formik.values.title} onChange={formik.handleChange} placeholder={'введите название...'} />
                        {formik.errors.title && formik.touched.title ? <p className={classes.Caption}>{formik.errors.title}</p> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input className={classes.Input} type={'text'} id={'content'} name={'content'} value={formik.values.content} onChange={formik.handleChange} placeholder={'опишите контент...'} />
                        {formik.errors.content && formik.touched.content ? <p className={classes.Caption}>{formik.errors.content}</p> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input className={classes.Input} type={'file'} id={'image'} name={'image'} onChange={(event) => {
                            const image = event.currentTarget.files ? event.currentTarget.files[0] : null;
                            formik.setFieldValue('image', image);
                        }}  placeholder={'загрузите файл...'} />
                        {formik.errors.image && formik.touched.image ? <p className={classes.Caption}>{formik.errors.image}</p> : null}
                    </div>
                </div>

                <Button className={classes.Button} type={'submit'}>Создать пост</Button>
                <Button type={'button'} className={classes.Button} onClick={getPostsFunc}>Получить посты</Button>
            </form>

            {posts && posts.length ?
                <div className={classes.Posts}>
                    <h2 className={classes.PostsTitle}>Здесь будут показаны последние новости школы!</h2>
                    <div className={classes.PostItems}>
                        {posts.map((post) => (
                            <div className={classes.PostItem} key={post.id}>
                                <div dangerouslySetInnerHTML={{__html: post.title}} className={classes.PostTitle} />
                                <div dangerouslySetInnerHTML={{__html: post.content}} className={classes.Desc} />
                                <div className={classes.Date}>{post.createdAt}</div>
                            </div>
                        ))}
                    </div>
                </div>
            : null}
        </div>
    );
};

export default Posts;