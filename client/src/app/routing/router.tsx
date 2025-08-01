import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import { Container } from "@/shared/ui/сontainer"
import { APP_ROUTES } from "@/app/routing/routes.ts"

const Auth = lazy(() => import(`@/features/auth`))
const NotFound = lazy(() => import(`@/pages/NotFound`))
const PrivateRoute = lazy(() => import(`@/app/routing/PrivateRoute.tsx`))
const Main = lazy(() => import(`@/pages/Main`))
const Posts = lazy(() => import(`@/pages/Posts`))
const About = lazy(() => import(`@/pages/About`))
const PostDetail = lazy(() => import(`@/pages/PostDetail`))
const UserDetail = lazy(() => import(`@/pages/UserDetail`))

const Router = () => {
    return (
        <Suspense
            fallback={
                <Container>
                    <Loader />
                </Container>
            }
        >
            <Routes>
                <Route
                    path={APP_ROUTES.LOGIN}
                    element={<Auth />}
                />
                <Route
                    path={APP_ROUTES.HOME}
                    element={<PrivateRoute element={<Main />} />}
                />
                <Route
                    path={APP_ROUTES.ABOUT}
                    element={<PrivateRoute element={<About />} />}
                />
                <Route path={APP_ROUTES.POSTS.INDEX}>
                    <Route
                        index
                        element={<PrivateRoute element={<Posts />} />}
                    />
                    <Route
                        path={APP_ROUTES.POSTS.DETAIL}
                        element={<PrivateRoute element={<PostDetail />} />}
                    />
                </Route>
                <Route
                    path={APP_ROUTES.USER}
                    element={<PrivateRoute element={<UserDetail />} />}
                />
                <Route
                    path={APP_ROUTES.NOT_FOUND}
                    element={<NotFound />}
                />
            </Routes>
        </Suspense>
    )
}

export default Router
