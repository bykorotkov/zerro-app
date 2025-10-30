import { Button } from "@/shared/ui/button";
import classes from "./Menu.module.scss";
import { HEADER_LINKS } from "@/shared/constants/constants.ts";

export const MenuList = () => {
    return (
        <ul className={classes.List}>
            {HEADER_LINKS.map((item) => (
                <li key={item.path}>
                    <Button href={item.path}>{item.text}</Button>
                </li>
            ))}
        </ul>
    );
};
