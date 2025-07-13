import { Container } from "@/shared/ui/сontainer/ui/Container.tsx"
import { useParams } from "react-router-dom"
import NotFound from "@/pages/NotFound"
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import classes from "./Intro.module.scss"
import { Link } from "@/shared/ui/link/ui/Link.tsx"
import { usePostDetail } from "../../model/hooks/usePostDetail.ts"
import { PostDate } from "@/features/posts/ui/PostDate/PostDate.tsx"

const Intro = () => {
    const { id } = useParams<{ id: string }>()

    const { data: post, isLoading, error, isError } = usePostDetail(Number(id))

    if (isLoading) return <Loader />
    if (isError) return <div>Ошибка: {error?.message}</div>
    if (!post) return <NotFound />

    return (
        <Container>
            <div className={classes.Post}>
                <h1>Название поста: {post.title}</h1>
                <p>Пост №{post.id}</p>
                {post.createdAt ? (
                    <p>
                        Дата поста: <PostDate isoDate={post.createdAt} />
                    </p>
                ) : null}
                {post.author ? (
                    <p>
                        Имя автора: <Link href={`/user/${post.author.id}`}>{post.author.username}</Link>
                    </p>
                ) : null}
                <div>
                    Конент поста: <p dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
            </div>
        </Container>
    )
}

export default Intro
