import classes from './Main.module.scss'
import Intro from "@/components/pages/Main/Intro/Intro.tsx";
import Layout from "@/components/global/Layout/Layout.tsx";

const Main = () => {
    return (
        <Layout>
            <div className={classes.MainPage}>
                <Intro />
            </div>
        </Layout>
    );
};

export default Main;