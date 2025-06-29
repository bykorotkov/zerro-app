import {FC} from "react";
import {useAuth} from "@/app/providers/useAuthContext.tsx";
import {Navigate} from "react-router-dom";
import { PrivateRoutProps } from "@/features/auth/model/types/types.ts"
import { APP_ROUTES } from "@/app/routing/routes.ts"

const PrivateRoute: FC<PrivateRoutProps> = ({element}) => {
    const {isAuth} = useAuth()

    return isAuth ? element : <Navigate to={APP_ROUTES.LOGIN} />
};

export default PrivateRoute;