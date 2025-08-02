import { useAppDispatch } from "@/app/providers/store/hooks/redux.ts";
import { openModal } from "@/app/providers/store/reducers/modalSlice.ts";
import { useLogoutMutation } from "@/features/auth/api/authApi.ts";
import { logout as logoutAction } from "@/app/providers/store/reducers/authSlice.ts";

export const useHeaderActions = () => {
    const dispatch = useAppDispatch();
    const [logoutApi] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            await logoutApi({}).unwrap();
            dispatch(logoutAction());
        } catch (err) {
            console.error(`Выход не удался, попробуйте снова.`, err);
        }
    };

    const showMenu = () => {
        dispatch(openModal(`Menu`));
    };

    return { showMenu, logout: handleLogout };
};
