import { useAppDispatch } from "@/app/providers/store/hooks/redux.ts"
import { openModal } from "@/app/providers/store/reducers/modalSlice.ts"
import { logout as logoutAction } from "@/app/providers/store/reducers/authSlice.ts"

export const useHeaderActions = () => {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logoutAction()) // Используем переименованное действие
    }

    const showMenu = () => {
        dispatch(openModal("Menu"))
    }

    return { showMenu, logout: handleLogout }
}