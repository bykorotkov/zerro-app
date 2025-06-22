import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/providers/store/hooks/redux.ts"
import { closeModal } from "@/app/providers/store/reducers/modalSlice.ts"

export const useModal = () => {
    const dispatch = useAppDispatch()
    const { name } = useAppSelector((state) => state.modalReducer)

    useEffect(() => {
        function handleKeyUp(event: any) {
            if (event.key === "Escape") {
                handleClose()
            }
        }

        window.addEventListener("keyup", handleKeyUp)

        return () => window.removeEventListener("keyup", handleKeyUp)
    }, [name])

    const handleClose = () => {
        dispatch(closeModal())
    }

    return { handleClose }
}