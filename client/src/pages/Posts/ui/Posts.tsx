import Layout from "@/app/layout/Layout.tsx";
import { Intro } from "@/pages/Posts/ui/Intro/Intro.tsx"
import classes from './Posts.module.scss'
import { Posts } from "@/widgets/get-posts"

export const PostsPage = () => {
    return (
        <Layout>
            <section className={classes.Posts}>
                <Intro />
                <Posts />
            </section>
        </Layout>
    );
};