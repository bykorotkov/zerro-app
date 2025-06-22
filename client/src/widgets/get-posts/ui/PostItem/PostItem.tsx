import classes from "../Posts.module.scss"
import { PostsTypes } from "@/widgets/get-posts/model/types.ts"
import { PostDate } from "@/widgets/get-posts/ui/PostDate/PostDate.tsx"

interface PostItemProps {
    post: PostsTypes
}

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
