import { NAV_ITEMS } from "@/widgets/Header/model/constants.ts"
import { Button } from "@/shared/ui/button"

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