import { Container } from "@/shared/ui/сontainer/ui/Container.tsx"
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import NotFound from "@/pages/NotFound"
import { useUser } from "@/pages/UserDetail/model/hooks/useUser.ts"
import { UserInfo } from "@/pages/UserDetail/ui/intro/UserInfo/UserInfo.tsx"
import { UserPosts } from "@/pages/UserDetail/ui/intro/UserPosts/UserPosts.tsx"

export const Intro = () => {
    const { data: user, isLoading, error, isError } = useUser()

    if (isLoading) return <Loader />
    if (isError) return <div>Ошибка: {error.message}</div>
    if (!user) return <NotFound />

    return (
        <Container>
            <h1>Персональная страница пользователя: {user.username}</h1>
            <UserInfo user={user} />
            <UserPosts user={user} />
        </Container>
    )
}

