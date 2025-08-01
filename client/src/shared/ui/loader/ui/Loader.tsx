import classes from "./Loader.module.scss"
import cn from "classnames"
import type { LoaderProps } from "@/shared/ui/loader/model/types.ts"

export const Loader = ({ type = `default` }: LoaderProps) => {
    return (
        <div className={classes.LoaderContainer}>
            <div
                data-testid="loader"
                className={cn(classes.Loader, {
                    [classes.Default]: type === `default`,
                    [classes.Red]: type === `red`,
                    [classes.Green]: type === `green`,
                })}
            ></div>
        </div>
    )
}
