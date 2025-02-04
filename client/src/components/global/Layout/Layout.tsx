import classes from './Layout.module.scss'
import Header from "@/components/global/Header/Header.tsx";

type LayoutType = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutType) => {
    return (
        <div className={classes.Layout}>
            <Header />
            {children}
        </div>
    );
};

export default Layout;