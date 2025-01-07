import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import Loader from "@/components/ui/Loader/Loader.tsx";

const Auth = lazy(() => import ("@/components/Auth/Auth.tsx"));
const Intro = lazy(() => import ("@/components/Intro/Intro.tsx"));
const NotFound = lazy(() => import ("@/components/NotFound/NotFound.tsx"));
const PrivateRoute = lazy(() => import ("@/components/Auth/PrivateRoute.tsx"));

const Navigation = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path={'/login'} element={<Auth />}/>
                <Route path={'/'} element={<PrivateRoute element={<Intro />} />}/>
                <Route path={'*'} element={<NotFound />}/>
            </Routes>
        </Suspense>
    );
};

export default Navigation;