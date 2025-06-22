import classes from "./Link.module.scss"
import cn from "classnames"
import { LinkProps } from "../model/types.ts"

export const Link = ({ href, target = "_self", className, children, isExternal }: LinkProps) => {
    const resolvedTarget = isExternal ? '_blank' : target;
    const resolvedRel = isExternal ? 'noopener noreferrer' : undefined;

    return (
        <a
            className={cn(classes.Link, className)}
            href={href}
            target={resolvedTarget}
            rel={resolvedRel}
        >
            {children}
        </a>
    )
}
