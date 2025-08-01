import classes from "./Panel.module.scss"
import ThemeIcon from "@/shared/assets/images/icons/themeIcon.tsx"
import cn from "classnames"
import { useTheme } from "../model/useTheme.ts"

export type PanelProps = {
    darkMode?: boolean
}

export const Panel = ({ darkMode }: PanelProps) => {
    const { currentTheme, themeChanger } = useTheme()

    return (
        <div
            className={classes.Panel}
            onClick={themeChanger}
        >
            {darkMode ? (
                <div className={cn(classes.ChangeLightMode, currentTheme !== `light` && classes.Dark)}>
                    <ThemeIcon />
                </div>
            ) : null}
        </div>
    )
}
