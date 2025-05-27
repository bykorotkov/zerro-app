import classes from './Panel.module.scss'
import ThemeIcon from "@/images/icons/themeIcon.tsx";
import {useEffect, useState} from "react";
import cn from "classnames";

type PanelProps = {
    darkMode?: boolean
}

const Panel = ({ darkMode }: PanelProps) => {
    const [currentTheme, setCurrentTheme] = useState<string>(() => {
        return localStorage.getItem("themeType") || themes[0];
    });

    const themes = ['light', 'dark']

    const themeChanger = () => {
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setCurrentTheme(themes[nextIndex]);
    };

    useEffect(() => {
        localStorage.setItem("themeType", currentTheme);
        const layout = document.getElementById('Layout')
        if (layout) {
            layout.setAttribute("data-theme", currentTheme);
        }
    }, [currentTheme]);

    return (
        <div className={classes.Panel} onClick={themeChanger}>
            {darkMode ? (
                <div className={cn(classes.ChangeLightMode, currentTheme !== 'light' && classes.Dark)}>
                    <ThemeIcon />
                </div>
            ) : null}

        </div>
    )
}

export default Panel