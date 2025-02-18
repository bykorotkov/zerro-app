import { FC, PropsWithChildren, useEffect } from "react"
import classes from "./Modal.module.scss"
import { closeModal } from "@/store/reducers/modalSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import CloseIcon from "@/images/icons/closeIcon"

type ModalType = {}

const Modal: FC<PropsWithChildren<ModalType>> = ({ children }) => {
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

    return (
        <div className={classes.Wrapper}>
            <div
                onClick={handleClose}
                className={classes.Close}
            >
                <CloseIcon />
            </div>
            {children}
        </div>
    )
}

export default Modal
