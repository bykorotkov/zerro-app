import type { FC, PropsWithChildren } from "react"
import classes from "./Modal.module.scss"
import CloseIcon from "@/shared/assets/images/icons/closeIcon.tsx"
import { useModal } from "@/widgets/modal/model/hooks/useModal.ts"

export type ModalType = {
    children: React.ReactNode
}

export const Modal: FC<PropsWithChildren<ModalType>> = ({ children }) => {
    const { handleClose } = useModal()

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
