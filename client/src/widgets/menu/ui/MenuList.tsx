import { Button } from "@/shared/ui/button"
import classes from "./Menu.module.scss"
import { MENU_ITEMS } from "../model/constants.ts"

export const MenuList = () => {
    return (
        <ul className={classes.List}>
            {MENU_ITEMS.map((item) => (
                <li key={item.path}>
                    <Button href={item.path}>{item.text}</Button>
                </li>
            ))}
        </ul>
    )
}
