import { Container } from "@/shared/ui/сontainer/ui/Container.tsx"
import { PostForm } from "./PostForm/PostForm.tsx"
import { PostList } from "./PostList/PostList.tsx"
import { usePosts } from "../model/hooks/usePosts.ts"

export const Posts = () => {
    const { posts, fetchPosts} = usePosts();

    return (
        <section>
            <Container>
                <PostForm fetchPosts={fetchPosts} />
                {posts.length > 0 && <PostList posts={posts} />}
            </Container>
        </section>
    );
};
