import {lazy, Suspense} from "react";
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import { useAppSelector } from "@/app/providers/store/hooks/redux.ts"

const AuthLogin = lazy(() => import("./login/AuthLogin.tsx")) ;
const AuthRegistration = lazy(() => import("./register/AuthRegistration.tsx")) ;

export const Auth = () => {
    const { isLoginMode } = useAppSelector((state) => state.authReducer)

    return (
        <Suspense fallback={<Loader />}>
            {isLoginMode ? (
                <AuthLogin />
            ) : (
                <AuthRegistration />
            )}
        </Suspense>
    )
}