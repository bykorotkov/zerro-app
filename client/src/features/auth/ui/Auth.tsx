import {lazy, Suspense} from "react";
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import {useAuth} from "@/app/providers/useAuthContext.tsx";

const AuthLogin = lazy(() => import("./login/AuthLogin.tsx")) ;
const AuthRegistration = lazy(() => import("./register/AuthRegistration.tsx")) ;

export const Auth = () => {
    const { isLoginMode, toggleMode } = useAuth()

    return (
        <Suspense fallback={<Loader />}>
            {isLoginMode ? (
                <AuthLogin toggleAuthMode={toggleMode} />
            ) : (
                <AuthRegistration toggleAuthMode={toggleMode} />
            )}
        </Suspense>
    )
}