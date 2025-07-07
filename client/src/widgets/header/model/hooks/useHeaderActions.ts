import { useAuth } from "@/app/providers/useAuthContext.tsx"
import { useAppDispatch } from "@/app/providers/store/hooks/redux.ts"
import { openModal } from "@/app/providers/store/reducers/modalSlice.ts"

export const useHeaderActions = () => {
    const dispatch = useAppDispatch()
    const { logout } = useAuth()

    const showMenu = () => {
        dispatch(openModal("Menu"))
    }

    return { showMenu, logout }
}