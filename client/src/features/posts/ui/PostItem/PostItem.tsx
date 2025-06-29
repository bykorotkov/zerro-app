import classes from "../Posts.module.scss"
import { PostDate } from "../PostDate/PostDate.tsx"
import { PostItemProps } from "@/features/posts/model/types.ts"

export const PostItem = ({ post }: PostItemProps) => {
    return (
        <a href={`/posts/${post.id}`} className={classes.PostItem}>
            <div dangerouslySetInnerHTML={{__html: post.title}} className={classes.PostTitle} />
            {post.author ? <div dangerouslySetInnerHTML={{__html: post.author.username + `. `}} className={classes.Desc} /> : null}
            <div dangerouslySetInnerHTML={{__html: post.content}} className={classes.Desc} />
            {post.createdAt ? <PostDate isoDate={post.createdAt} /> : null}
        </a>
    )
}
