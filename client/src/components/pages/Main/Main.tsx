import classes from './Main.module.scss'
import Layout from "@/components/global/Layout/Layout.tsx";
import Container from "@/components/global/Container/Container.tsx";
import SideBar from "@/components/ui/SideBar/SideBar.tsx";
import User from "@/components/pages/Main/User/User.tsx";

const Main = () => {

    return (
        <Layout>
            <Container>
                <div className={classes.MainPage}>
                    <SideBar />

                    <div className={classes.Content}>
                        <User />
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default Main;