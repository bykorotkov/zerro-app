import { useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/providers/store/hooks/redux.ts"
import { closeModal } from "@/app/providers/store/reducers/modalSlice.ts"

export const useModal = () => {
    const dispatch = useAppDispatch()
    const { name } = useAppSelector((state) => state.modalReducer)

    const handleClose = useCallback(() => {
        dispatch(closeModal())
    }, [dispatch])

    useEffect(() => {
        function handleKeyUp(event: KeyboardEvent) {
            if (event.key === `Escape`) {
                handleClose()
            }
        }

        window.addEventListener(`keyup`, handleKeyUp)

        return () => window.removeEventListener(`keyup`, handleKeyUp)
    }, [name, handleClose])

    return { handleClose }
}
