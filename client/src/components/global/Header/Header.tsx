import classes from './Header.module.scss'
import {useEffect, useState} from "react";
import Button from "@/components/ui/Button/Button.tsx";
import {useAuth} from "@/context/useAuthContext.tsx";

const Header = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHeaderVisible, setHeaderVisible] = useState(true);
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

    return (
        <header className={classes.Header} id={'header'} style={{top: isHeaderVisible ? '0' : '-100px'}}>
            <div className={classes.Left}>
                <div className={classes.BurgerContainer}>
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
                    <li><a href={'/'}>Главная</a></li>
                    <li><a href={'/posts'}>Посты</a></li>
                    <li><a href={'/'}>Личный кабинет</a></li>
                    <li><a href={'/'}>Чат</a></li>
                    <li><a href={'/'}>Фотографии</a></li>
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