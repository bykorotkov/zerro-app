import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import Loader from "@/components/ui/Loader/Loader.tsx";

const Auth = lazy(() => import ("@/components/pages/Auth/Auth.tsx"));
const NotFound = lazy(() => import ("@/components/pages/NotFound/NotFound.tsx"));
const PrivateRoute = lazy(() => import ("@/components/pages/Auth/PrivateRoute.tsx"));
const Main = lazy(() => import("@/components/pages/Main/Main.tsx"))
const Posts = lazy(() => import('@/components/pages/Posts/Posts.tsx'))

const Navigation = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={'/login'} element={<Auth />}/>
                <Route path={'/'} element={<PrivateRoute element={<Main />} />}/>
                <Route path={'/posts'} element={<PrivateRoute element={<Posts />} />}/>
                <Route path={'*'} element={<NotFound />}/>
            </Routes>
        </Suspense>
    );
};

export default Navigation;