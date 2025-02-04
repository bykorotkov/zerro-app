import classes from './Link.module.scss'
import {FC, ReactNode} from "react";
import cn from "classnames";

interface LinkProps {
    href: string
    target?: string
    className?: string
    children: ReactNode
}

const Link:FC<LinkProps> = ({href, target, className, children}: LinkProps) => {
    return (
        <a className={cn(classes.Link, className)} href={href} target={target}>
            {children}
        </a>
    );
};

export default Link;