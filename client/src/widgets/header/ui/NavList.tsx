import { Button } from "@/shared/ui/button"
import { NAV_ITEMS } from "../model/constants.ts"

export const NavList = () => {
    return (
        <ul>
            {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                    <Button href={item.path}>{item.text}</Button>
                </li>
            ))}
        </ul>
    )
}
