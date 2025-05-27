import classes from './Main.module.scss'
import Layout from "@/components/global/Layout/Layout.tsx";
import Container from "@/components/global/Container/Container.tsx";
import SideBar from "@/components/ui/SideBar/SideBar.tsx";
import User from "@/components/pages/Main/User/User.tsx";
import {useQuery} from "@tanstack/react-query";
import {UserType} from "@/types/global.ts";
import {getUser} from "@/app/api.ts";

const Main = () => {
    const {
        data: user,
        isLoading,
        error
    } = useQuery<UserType>({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const userData = await getUser();
            if (!localStorage.getItem('userId')) {
                localStorage.setItem('userId', userData.id.toString());
            }
            return userData;
        },
    });

    return (
        <Layout>
            <Container>
                <div className={classes.MainPage}>
                    <SideBar user={user} />

                    <div className={classes.Content}>
                        <User user={user} isLoading={isLoading} error={error} />
                    </div>
                </div>
            </Container>
        </Layout>
    );
};

export default Main;