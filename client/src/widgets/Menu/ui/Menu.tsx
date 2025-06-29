import classes from './Menu.module.scss'
import cn from "classnames";
import { Modal } from "@/widgets/modal/ui/Modal.tsx"
import { MenuList } from "./MenuList.tsx"
import { MenuProps } from "../model/types.ts"

export const Menu = ({className}: MenuProps) => {
    return (
        <Modal>
            <div className={cn(classes.Menu, className)}>
                <MenuList />
            </div>
        </Modal>
    );
};
