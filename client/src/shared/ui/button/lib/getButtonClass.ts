
import { ButtonVariant } from "../model/types.ts";
import cn from "classnames";
import classes from '../ui/Button.module.scss'

export const getButtonClass = (
    variant: ButtonVariant = 'primary',
    className?: string,
) => {
    return cn(
        classes.Button,
        {
            [classes.Primary]: variant === 'primary',
            [classes.Secondary]: variant === 'secondary',
        },
        className,
    )
}

export const getLinkClass = (
    variant: ButtonVariant = 'primary',
    className?: string,
) => {
    return cn(
        classes.Link,
        {
            [classes.Primary]: variant === 'primary',
            [classes.Secondary]: variant === 'secondary',
        },
        className,
    )
}