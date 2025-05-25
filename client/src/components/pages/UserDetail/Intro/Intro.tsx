import Container from "@/components/global/Container/Container.tsx";
import {useQuery} from "@tanstack/react-query";
import {getUser} from "@/app/api.ts";
import Loader from "@/components/ui/Loader/Loader.tsx";
import NotFound from "@/components/pages/NotFound/NotFound.tsx";
import {UserType} from "@/types/global.ts";
import classes from "./Intro.module.scss";
import Button from "@/components/ui/Button/Button.tsx";
import cn from "classnames";

const Intro = () => {

    const {
        data: user,
        isLoading,
        error,
        isError
    } = useQuery<UserType>({
        queryKey: ['user'],
        queryFn: () => {
            return getUser();
        }
    })

    if (isLoading) return <Loader />;
    if (isError) return <div>Ошибка: {error.message}</div>;
    if (!user) return <NotFound />;

    return (
        <Container>
            <h1>Персональная страница пользователя: {user.username}</h1>
            <p>Номер пользователя: {user.id}</p>
            {user.phone ? (<div className={classes.Line}><span>Телефон:</span> <Button href={`tel: ${user.phone}`}>{user.phone}</Button></div>) : null}
            {user.email ? (<div className={classes.Line}><span>E-mail:</span> <Button href={`mailto: ${user.email}`}>{user.email}</Button></div>) : null}
            <div className={classes.Line}><span>Чат:</span> {user.banned ? user.banned : 'Активен'}</div>
            {user.banReason ? (<div className={classes.Line}><span>Причина бана:</span> {user.banReason}</div>) : null}

            <div className={cn(classes.Block, {[classes.Empty] : user.posts && user.posts.length === 0})}>
                {user.posts && user.posts.length ? <div className={classes.Head}>Посты пользователя:</div> : <div className={classes.Head}>Постов на данный момент нет</div>}
                {user.posts && user.posts.length ? <div className={classes.Line}>
                    Ваши посты: {user.posts.map((post) => (
                        <div key={post.id}>
                            <Button href={`/posts/${post.id}`}>{post.title}</Button>
                        </div>
                ))}
                </div> : <Button variant={'secondary'} href={'/posts/'}>Создать пост!</Button>}
            </div>
        </Container>
    );
};

export default Intro;