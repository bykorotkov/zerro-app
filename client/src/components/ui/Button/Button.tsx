import classes from './Button.module.scss'
import {AnchorHTMLAttributes, ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode} from "react";
import cn from "classnames";

interface ButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>
    children?: ReactNode
    variant?: 'primary' | 'secondary'
    href?: string
    target?: string
    type?: "submit" | "reset" | "button" | undefined
    className?: string
}

type ButtonAttributes = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorAttributes = ButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const Button:FC<ButtonAttributes | AnchorAttributes> = ({onClick, children = 'button', variant = 'primary', href, target, type, className, ...props}: ButtonProps) => {
    const ButtonClass = variant === 'primary' ? classes.Primary : classes.Secondary

    return (
        href ? (
            <a href={href} target={target} className={cn(classes.Link, ButtonClass, className)} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {children}
            </a>
            ) : (
            <button onClick={onClick} className={cn(classes.Button, ButtonClass, className)} type={type} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
                {children}
            </button>
        )

    );
};

export default Button;