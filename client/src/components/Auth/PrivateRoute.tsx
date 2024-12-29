import {FC, ReactElement} from "react";
import {useAuth} from "@/context/useAuthContext.tsx";
import {Navigate} from "react-router-dom";

interface PrivateRoutProps {
    element: ReactElement
}

const PrivateRoute: FC<PrivateRoutProps> = ({element}) => {
    const {isAuth} = useAuth()

    return isAuth ? element : <Navigate to={'/login'} />
};

export default PrivateRoute;