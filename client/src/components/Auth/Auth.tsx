import {lazy, Suspense} from "react";
import Loader from "@/components/ui/Loader/Loader.tsx";
import {useAuth} from "@/context/useAuthContext.tsx";

const AuthLogin = lazy(() => import("./AuthLogin/AuthLogin.tsx")) ;
const AuthRegistration = lazy(() => import("./AuthRegistration/AuthRegistration.tsx")) ;

const Auth = () => {
    const {isLoginMode, toggleMode} = useAuth()

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

export default Auth