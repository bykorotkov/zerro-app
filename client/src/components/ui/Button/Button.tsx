import classes from './Button.module.scss'
import {FC, MouseEventHandler, ReactNode} from "react";
import cn from "classnames";

interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>
    children: ReactNode
    variant?: 'primary' | 'secondary'
    href?: string
    target?: string
    type?: "submit" | "reset" | "button" | undefined
    className?: string
}

const Button:FC<ButtonProps> = ({onClick, children, variant = 'primary', href, target, type, className}: ButtonProps) => {
    const ButtonClass = variant === 'primary' ? classes.Primary : classes.Secondary

    return (
        href ? (
            <a href={href} target={target} className={cn(classes.Button, ButtonClass, className)}>
                {children}
            </a>
            ) : (
            <button onClick={onClick} className={cn(classes.Button, ButtonClass, className)} type={type}>
                {children}
            </button>
        )

    );
};

export default Button;