import classes from './Layout.module.scss'
import Header from "@/components/global/Header/Header.tsx";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import AnimatedComponent from "@/components/pages/About/Intro/AnimatedComponent/AnimatedComponent.tsx";
import Menu from "@/components/widgets/Menu/Menu.tsx";
import {useAppSelector} from "@/hooks/redux.ts";
import { CSSTransition } from "react-transition-group"
import Footer from "@/components/global/Footer/Footer.tsx";

type LayoutType = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutType) => {
    const [isPreviewShown, setIsPreviewShown] = useState(false)
    const { name } = useAppSelector((state) => state.modalReducer)

    useEffect(() => {
        if (!Cookies.get('preview-is-shown')) {
            setIsPreviewShown(true)
            Cookies.set('preview-is-shown', 'true', {expires: 1})
        }
    }, []);

    return (
        <div className={classes.Layout}>
            <main className={classes.Inner}>
                <Header />
                {children}

                {isPreviewShown ? (
                    <AnimatedComponent />
                ) : null}

                <Footer />
            </main>

            <CSSTransition in={name === 'Menu'} timeout={200} mountOnEnter={true} unmountOnExit={true}>
                {() => <Menu  />}
            </CSSTransition>
        </div>
    );
};

export default Layout;