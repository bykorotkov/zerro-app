import {lazy, Suspense, useState} from "react";
import Loader from "@/components/ui/Loader/Loader.tsx";

const AuthLogin = lazy(() => import("./AuthLogin/AuthLogin.tsx")) ;
const AuthRegistration = lazy(() => import("./AuthRegistration/AuthRegistration.tsx")) ;

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true)

    const toggleMode = () => {
        setIsLoginMode(prevState => !prevState)
    }

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