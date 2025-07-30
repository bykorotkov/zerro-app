import classes from "./Main.module.scss"
import Layout from "@/app/layout/Layout.tsx"
import { Container } from "@/shared/ui/сontainer/ui/Container.tsx"
import { SideBar } from "@/shared/ui/sidebar"
import { User } from "@/pages/Main/ui/User/User.tsx"
import { useGetUserQuery } from "@/shared/api/userApi.ts"

export const Main = () => {
    const { data: user, error, isLoading } = useGetUserQuery();

    return (
        <Layout>
            <Container>
                <div className={classes.MainPage}>
                    <SideBar user={user} />

                    <div className={classes.Content}>
                        <User
                            user={user}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </div>
            </Container>
        </Layout>
    )
}
