import Layout from "@/components/global/Layout/Layout.tsx";
import Intro from "@/components/pages/Posts/Intro/Intro.tsx";
import PostsComponent from "@/components/widgets/Posts/Posts.tsx"
import classes from './Posts.module.scss'


const Posts = () => {
    return (
        <Layout>
            <section className={classes.Posts}>
                <Intro />
                <PostsComponent />
            </section>

        </Layout>
    );
};

export default Posts;