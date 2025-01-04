
import {AuthProvider, useAuth} from "@/context/useAuthContext.tsx";
import AuthLogin from "@/components/Auth/AuthLogin/AuthLogin.tsx";
import AuthRegistration from "@/components/Auth/AuthRegistration/AuthRegistration.tsx";

const Auth = () => {
    const { isAuth } = useAuth()

    return (
        isAuth ? <AuthLogin /> : <AuthRegistration />
    )
}

export const AuthWrap = () => (
    <AuthProvider>
        <Auth />
    </AuthProvider>
)