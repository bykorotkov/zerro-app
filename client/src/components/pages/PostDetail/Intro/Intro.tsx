import Container from "@/components/global/Container/Container.tsx";
import {getPostDetail} from "@/app/api.ts";
import {useParams} from "react-router-dom";
import NotFound from "@/components/pages/NotFound/NotFound.tsx";
import {useQuery} from "@tanstack/react-query";
import Loader from "@/components/ui/Loader/Loader.tsx";
import {PostsTypes} from "@/types/posts.ts";
import DateComponent from "@/components/widgets/Posts/DateComponent/DateComponent.tsx";
import classes from './Intro.module.scss'

const Intro = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: post,
        isLoading,
        error,
        isError
    } = useQuery<PostsTypes, Error>({
        queryKey: ['post', id],
        queryFn: () => {
            if (!id) throw new Error('ID поста не указан');
            return getPostDetail(Number(id));
        },
        staleTime: 60_000, // Данные "свежие" 60 секунд
        retry: 2, // 2 попытки при ошибке
        retryDelay: 120_000, // Фиксированная задержка 2 минуты (120 000 мс)
        enabled: !!id,
    });

    if (isLoading) return <Loader />;
    if (isError) return <div>Ошибка: {error.message}</div>;
    if (!post) return <NotFound />;

    return (
        <Container>
            <div className={classes.Post}>
                <h1>Название поста: {post.title}</h1>
                <p>Пост №{post.id}</p>
                {post.createdAt ? <p>Дата поста: <DateComponent isoDate={post.createdAt} /></p> : null}
                {post.author ? <p>Имя автора: {post.author.username}</p> : null}
                <div>Конент поста: <p dangerouslySetInnerHTML={{__html: post.content}} /></div>
            </div>
        </Container>
    );
};

export default Intro;