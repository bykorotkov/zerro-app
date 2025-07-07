import classes from "@/widgets/Header/ui/Header.module.scss"
import { useHeaderActions } from "../model/hooks/useHeaderActions.ts"

export const Burger = () => {
    const { showMenu } = useHeaderActions()

    return (
        <div
            className={classes.BurgerContainer}
            onClick={showMenu}
        >
            <div className={classes.BurgerItems}>
                <div className={classes.Line}></div>
                <div className={classes.Line}></div>
                <div className={classes.Line}></div>
            </div>
            <div className={classes.Burger}>Меню</div>
        </div>
    )
}
