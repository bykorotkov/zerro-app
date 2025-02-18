import  {useEffect, useState} from 'react';
import {getUser} from "@/app/api.ts";
import classes from './User.module.scss'
import {UserType} from "@/types/global.ts";
import cn from "classnames";
import Button from "@/components/ui/Button/Button.tsx";

const User = () => {
    const [user, setUser] = useState<UserType | null>(null)

    useEffect( () => {
        const fetchUser = async () => {
            try {
                const userResponse: UserType = await getUser();
                setUser(userResponse);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [])

    console.log('log', user)

    return (
        <div className={classes.User}>
            <div className={classes.Top}>
                {user && user.username ? <div className={classes.Greeting}>Привет, {user.username}! С возвращением ;)</div> : null}
            </div>

            {user ? (
                <div className={classes.Content}>
                    <div className={classes.Block}>
                        <div className={classes.Head}>Ваши контактные данные:</div>
                        {user.phone ? (<div className={classes.Line}><span>Телефон:</span> {user.phone}</div>) : null}
                        {user.email ? (<div className={classes.Line}><span>E-mail:</span> {user.email}</div>) : null}
                        <div className={classes.Line}><span>Чат:</span> {user.banned ? user.banned : 'Активен'}</div>
                        {user.banReason ? (<div className={classes.Line}><span>Причина бана:</span> {user.banReason}</div>) : null}
                    </div>

                    <div className={cn(classes.Block, {[classes.Empty] : user.posts && user.posts.length === 0})}>
                        {user.posts && user.posts.length ? <div className={classes.Head}>Ваши посты:</div> : <div className={classes.Head}>Постов на данный момент нет. Давайте их создадим!</div>}
                        {user.posts && user.posts.length ? <div className={classes.Line}><span>Посты...</span></div> : <Button variant={'secondary'} href={'/posts/'}>Создать пост!</Button>}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default User;