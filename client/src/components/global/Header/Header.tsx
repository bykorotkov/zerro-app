import classes from './Header.module.scss'
import {useEffect, useState} from "react";
import Button from "@/components/ui/Button/Button.tsx";
import {useAuth} from "@/context/useAuthContext.tsx";
import {useAppDispatch} from "@/hooks/redux.ts";
import {openModal} from "@/store/reducers/modalSlice.ts";

const Header = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHeaderVisible, setHeaderVisible] = useState(true);
    const dispatch = useAppDispatch()
    const { logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;

            if (currentPosition > scrollPosition) {
                setHeaderVisible(false)
            } else {
                setHeaderVisible(true)
            }

            setScrollPosition(currentPosition);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scrollPosition])

    const showMenu = () => {
        dispatch(openModal("Menu"))
    }

    return (
        <header className={classes.Header} id={'header'} style={{top: isHeaderVisible ? '0' : '-100px'}}>
            <div className={classes.Left}>
                <div className={classes.BurgerContainer} onClick={showMenu}>
                    <div className={classes.BurgerItems}>
                        <div className={classes.Line}></div>
                        <div className={classes.Line}></div>
                        <div className={classes.Line}></div>
                    </div>
                    <div className={classes.Burger}>Меню</div>
                </div>
            </div>

            <div className={classes.Middle}>
                <ul>
                    <li><Button href={'/'}>Главная</Button></li>
                    <li><Button href={'/about'}>О школе</Button></li>
                    <li><Button href={'/posts'}>Посты</Button></li>
                    <li><Button href={'/study'}>Учебный процесс</Button></li>
                    <li><Button href={'/reviews'}>Отзывы</Button></li>
                    <li><Button href={'/prices'}>Стоимость</Button></li>
                    <li><Button href={'/contacts'}>Контакты</Button></li>
                </ul>
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

export default Header;