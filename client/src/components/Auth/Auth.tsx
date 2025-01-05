import AuthLogin from "./AuthLogin/AuthLogin.tsx";
import AuthRegistration from "./AuthRegistration/AuthRegistration.tsx";
import {useState} from "react";

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true)

    const toggleMode = () => {
        setIsLoginMode(prevState => !prevState)
    }

    return (
        <>
            {isLoginMode ? (
                <AuthLogin toggleAuthMode={toggleMode} />
            ) : (
                <AuthRegistration toggleAuthMode={toggleMode} />
            )}
        </>
    )
}

export default Auth