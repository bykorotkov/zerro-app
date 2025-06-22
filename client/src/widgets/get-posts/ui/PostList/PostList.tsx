import classes from "../Posts.module.scss"
import { PostItem } from "../PostItem/PostItem.tsx"
import { PostsTypes } from "../../model/types.ts"

interface PostListProps {
    posts: PostsTypes[]
}

export const PostList = ({ posts }: PostListProps) => {
    return (
        posts && posts.length ?
            <div className={classes.Posts}>
                <h2 className={classes.PostsTitle}>Последние новости школы!</h2>
                <div className={classes.PostItems}>
                    {posts.map((post) => (
                        <PostItem post={post} key={post.id} />
                    ))}
                </div>
            </div>
        : null
    )
}