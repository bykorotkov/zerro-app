import classes from './Header.module.scss'
import {Button} from "@/shared/ui/button/ui/Button.tsx";
import { useHeaderScroll } from "@/widgets/Header/model/hooks/useHeaderScroll.ts"
import { useHeaderActions } from "@/widgets/Header/model/hooks/useHeaderActions.ts"
import { NavList } from "@/widgets/Header/ui/NavList.tsx"
import { Burger } from "@/widgets/Header/ui/Burger.tsx"

export const Header = () => {
    const { isHeaderVisible } = useHeaderScroll();
    const { logout } = useHeaderActions();

    return (
        <header className={classes.Header} id={'header'} style={{top: isHeaderVisible ? '0' : '-100px'}}>
            <div className={classes.Left}>
               <Burger />
            </div>

            <div className={classes.Middle}>
                <NavList />
            </div>

            <div className={classes.Right}>
                <div className={classes.Link}>
                    <a href="tel:+74955272121">+7 495 527 21 21</a>
                    <a href="tel:+74955272121">+7 495 527 21 21</a>
                </div>

                <Button onClick={logout}>Выход</Button>
            </div>
        </header>
    );
};