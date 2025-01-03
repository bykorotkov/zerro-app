import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import Loader from "@/components/ui/Loader/Loader.tsx";

interface AuthContextType {
    isAuth: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true);

    const login = () => {
        setIsAuth(true)
        sessionStorage.setItem('isAuth', 'true')
    }
    const logout = () => {
        setIsAuth(false)
        sessionStorage.setItem('isAuth', 'false')
    }

    useEffect(() => {
        const storedAuth = sessionStorage.getItem('isAuth')
        if (storedAuth === 'true') {
            setIsAuth(true)
        }
        setLoading(false)

    }, [isAuth])

    if (loading) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{isAuth, login, logout}}>
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