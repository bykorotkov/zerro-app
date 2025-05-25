import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import Loader from "@/components/ui/Loader/Loader.tsx";

const Auth = lazy(() => import ("@/components/pages/Auth/Auth.tsx"));
const NotFound = lazy(() => import ("@/components/pages/NotFound/NotFound.tsx"));
const PrivateRoute = lazy(() => import ("@/components/pages/Auth/PrivateRoute.tsx"));
const Main = lazy(() => import("@/components/pages/Main/Main.tsx"))
const Posts = lazy(() => import('@/components/pages/Posts/Posts.tsx'))
const About = lazy(() => import("@/components/pages/About/About.tsx"))
const PostDetail = lazy(() => import("@/components/pages/PostDetail/PostDetail.tsx"))
const UserDetail = lazy(() => import("@/components/pages/UserDetail/UserDetail.tsx"))

const Navigation = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={'/login'} element={<Auth />}/>
                <Route path={'/'} element={<PrivateRoute element={<Main />} />}/>
                <Route path={'/about'} element={<PrivateRoute element={<About />} />}/>
                <Route path="posts">
                    <Route index element={<PrivateRoute element={<Posts />} />} />
                    <Route path=":id" element={<PrivateRoute element={<PostDetail />} />} />
                </Route>
                <Route path={'/user/:id'} element={<PrivateRoute element={<UserDetail />} />} />
                <Route path={'*'} element={<NotFound />}/>
            </Routes>
        </Suspense>
    );
};

export default Navigation;