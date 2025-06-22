import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import { Container } from "@/shared/ui/сontainer"

const Auth = lazy(() => import("@/pages/Auth"))
const NotFound = lazy(() => import("@/pages/NotFound"))
const PrivateRoute = lazy(() => import("@/app/routing/PrivateRoute"))
const Main = lazy(() => import("@/pages/Main"))
const Posts = lazy(() => import("@/pages/Posts"))
const About = lazy(() => import("@/pages/About"))
const PostDetail = lazy(() => import("@/pages/PostDetail"))
const UserDetail = lazy(() => import("@/pages/UserDetail"))

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
                    path={"/login"}
                    element={<Auth />}
                />
                <Route
                    path={"/"}
                    element={<PrivateRoute element={<Main />} />}
                />
                <Route
                    path={"/about"}
                    element={<PrivateRoute element={<About />} />}
                />
                <Route path="posts">
                    <Route
                        index
                        element={<PrivateRoute element={<Posts />} />}
                    />
                    <Route
                        path=":id"
                        element={<PrivateRoute element={<PostDetail />} />}
                    />
                </Route>
                <Route
                    path={"/user/:id"}
                    element={<PrivateRoute element={<UserDetail />} />}
                />
                <Route
                    path={"*"}
                    element={<NotFound />}
                />
            </Routes>
        </Suspense>
    )
}

export default Router
