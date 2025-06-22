import {FC} from "react";
import {useAuth} from "@/app/providers/useAuthContext.tsx";
import {Navigate} from "react-router-dom";
import { PrivateRoutProps } from "@/pages/Auth/model/types/types.ts"

const PrivateRoute: FC<PrivateRoutProps> = ({element}) => {
    const {isAuth} = useAuth()

    return isAuth ? element : <Navigate to={'/login'} />
};

export default PrivateRoute;