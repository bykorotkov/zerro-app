import { MENU_ITEMS } from "@/widgets/Menu/model/constants.ts"
import { Button } from "@/shared/ui/button"
import classes from './Menu.module.scss'

export const MenuList = () => {
    return (
        <ul className={classes.List}>
            {MENU_ITEMS.map((item) => (
                <li key={item.path}>
                    <Button href={item.path}>
                        {item.text}
                    </Button>
                </li>
            ))}
        </ul>
    )
}