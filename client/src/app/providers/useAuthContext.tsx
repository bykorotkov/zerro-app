import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import { logoutUser } from "@/features/auth/api"

interface AuthContextType {
    isAuth: boolean
    login: (token: string) => void
    logout: () => void
    isLoginMode: boolean
    setIsLoginMode: Dispatch<SetStateAction<boolean>>
    toggleMode: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoginMode, setIsLoginMode] = useState(true)

    const login = () => {
        setIsAuth(true)
    }
    const logout = async () => {
        setIsAuth(false)
        await logoutUser()
    }

    const toggleMode = () => {
        setIsLoginMode(prevState => !prevState)
    }

    useEffect(() => {
        const storedAuth = localStorage.getItem('token')
        if (storedAuth) {
            setIsAuth(true)
        }
        setLoading(false)

    }, [isAuth])


    if (loading) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{isAuth, login, logout, isLoginMode, setIsLoginMode, toggleMode}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
}