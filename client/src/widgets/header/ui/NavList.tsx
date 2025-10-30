import { Button } from "@/shared/ui/button";
import { HEADER_LINKS } from "@/shared/constants/constants.ts";

export const NavList = () => {
    return (
        <ul>
            {HEADER_LINKS.map((item) => (
                <li key={item.path}>
                    <Button href={item.path}>{item.text}</Button>
                </li>
            ))}
        </ul>
    );
};
