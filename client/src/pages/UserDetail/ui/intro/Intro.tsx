import { Container } from "@/shared/ui/сontainer/ui/Container.tsx"
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import NotFound from "@/pages/NotFound"
import { UserInfo } from "@/pages/UserDetail/ui/intro/UserInfo/UserInfo.tsx"
import { UserPosts } from "@/pages/UserDetail/ui/intro/UserPosts/UserPosts.tsx"
import { useGetUserQuery } from "@/shared/api/userApi.ts"

export const Intro = () => {
    const { data: user, error, isLoading, isError } = useGetUserQuery()

    if (isLoading) return <Loader />
    if (isError)
        return (
            <div>
                Ошибка:
                {error.message}
            </div>
        )
    if (!user) return <NotFound />

    return (
        <Container>
            <h1>
                Персональная страница пользователя:
                {user.username}
            </h1>
            <UserInfo user={user} />
            <UserPosts user={user} />
        </Container>
    )
}
