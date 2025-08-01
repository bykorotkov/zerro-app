import cn from "classnames"
import classes from "../Intro.module.scss"
import { Button } from "@/shared/ui/button"
import type { UserType } from "@/app/types/global.ts"

interface UserPostsProps {
    user: UserType
}

export const UserPosts = ({ user }: UserPostsProps) => {
    return (
        <div className={cn(classes.Block, { [classes.Empty]: user.posts && user.posts.length === 0 })}>
            {user.posts && user.posts.length ? (
                <div className={classes.Head}>Посты пользователя:</div>
            ) : (
                <div className={classes.Head}>Постов на данный момент нет</div>
            )}
            {user.posts && user.posts.length ? (
                <div className={classes.Line}>
                    Ваши посты:
                    {` `}
                    {user.posts.map((post) => (
                        <div key={post.id}>
                            <Button href={`/posts/${post.id}`}>{post.title}</Button>
                        </div>
                    ))}
                </div>
            ) : (
                <Button
                    variant="secondary"
                    href="/posts/"
                >
                    Создать пост!
                </Button>
            )}
        </div>
    )
}
