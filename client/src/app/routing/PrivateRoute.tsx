import type { FC } from "react"
import { Navigate } from "react-router-dom"
import type { PrivateRoutProps } from "@/features/auth/model/types/types.ts"
import { APP_ROUTES } from "@/app/routing/routes.ts"
import { useAppSelector } from "@/app/providers/store/hooks/redux.ts"

const PrivateRoute: FC<PrivateRoutProps> = ({ element }) => {
    const { isAuth } = useAppSelector((state) => state.authReducer)

    return isAuth ? element : <Navigate to={APP_ROUTES.LOGIN} />
}

export default PrivateRoute
