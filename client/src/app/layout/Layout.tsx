import { useAppSelector } from "@/app/providers/store/hooks/redux.ts";
import { Footer } from "@/widgets/footer/ui/Footer.tsx";
import { Header } from "@/widgets/header";
import { Menu } from "@/widgets/menu";
import AnimatedComponent from "@/widgets/preloader/ui/AnimatedComponent.tsx";
import { Panel } from "@/widgets/theme-panel";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import classes from "./Layout.module.scss";

type LayoutType = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutType) => {
    const [isPreviewShown, setIsPreviewShown] = useState(false);
    const { name } = useAppSelector((state) => state.modalReducer);

    useEffect(() => {
        if (!Cookies.get(`preview-is-shown`)) {
            setIsPreviewShown(true);
            Cookies.set(`preview-is-shown`, `true`, { expires: 1 });
        }
    }, []);

    return (
        <div
            className={classes.Layout}
            id="Layout"
        >
            <main className={classes.Inner}>
                <Header />
                {children}

                {isPreviewShown ? <AnimatedComponent /> : null}

                <Panel darkMode />

                <Footer />
            </main>

            <CSSTransition
                in={name === `Menu`}
                timeout={200}
                mountOnEnter={true}
                unmountOnExit={true}
            >
                {() => <Menu />}
            </CSSTransition>
        </div>
    );
};

export default Layout;
