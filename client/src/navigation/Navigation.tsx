import {Route, Routes} from "react-router-dom";
import Auth from "@/components/Auth/Auth.tsx";
import Intro from "@/components/Intro/Intro.tsx";
import NotFound from "@/components/NotFound/NotFound.tsx";
import PrivateRoute from "@/components/Auth/PrivateRoute.tsx";

const Navigation = () => {
    return (
        <Routes>
            <Route path={'/login'} element={<Auth />}/>
            <Route path={'/'} element={<PrivateRoute element={<Intro />} />}/>
            <Route path={'*'} element={<NotFound />}/>
        </Routes>
    );
};

export default Navigation;