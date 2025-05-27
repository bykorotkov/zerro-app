import classes from './User.module.scss'
import {UserType} from "@/types/global.ts";
import cn from "classnames";
import Button from "@/components/ui/Button/Button.tsx";
import Loader from "@/components/ui/Loader/Loader.tsx";

interface UserProps {
    isLoading: boolean
    error: Error | null
    user?: UserType
}

const User = ({ isLoading, error, user }: UserProps) => {
    if (isLoading) return <Loader />;
    if (error) return <div>Ошибка загрузки данных пользователя</div>;

    return (
        <div className={classes.User}>
            <div className={classes.Top}>
                {user && user.username ? <div className={classes.Greeting}>Привет, {user.username}! С возвращением ;)</div> : null}
            </div>

            {user ? (
                <div className={classes.Content}>
                    <div className={classes.Block}>
                        <div className={classes.Head}>Ваши контактные данные:</div>
                        {user.phone ? (<div className={classes.Line}><span>Телефон:</span> <Button href={`tel: ${user.phone}`}>{user.phone}</Button></div>) : null}
                        {user.email ? (<div className={classes.Line}><span>E-mail:</span> <Button href={`mailto: ${user.email}`}>{user.email}</Button></div>) : null}
                        <div className={classes.Line}><span>Чат:</span> {user.banned ? user.banned : 'Активен'}</div>
                        {user.banReason ? (<div className={classes.Line}><span>Причина бана:</span> {user.banReason}</div>) : null}
                    </div>

                    <div className={cn(classes.Block, {[classes.Empty] : user.posts && user.posts.length === 0})}>
                        {user.posts && user.posts.length ? <div className={classes.Head}>Ваши посты:</div> : <div className={classes.Head}>Постов на данный момент нет. Давайте их создадим!</div>}
                        {user.posts && user.posts.length ? <div className={classes.Line}>
                            Ваши посты: {user.posts.map((post) => (
                                <div key={post.id}>
                                    <Button href={`/posts/${post.id}`}>{post.title}</Button>
                                </div>
                        ))}
                        </div> : <Button variant={'secondary'} href={'/posts/'}>Создать пост!</Button>}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default User;