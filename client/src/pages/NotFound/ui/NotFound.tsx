import { Button } from "@/shared/ui/button/ui/Button.tsx"
import classes from "./NotFound.module.scss"

export const NotFound = () => {
    return (
        <div className={classes.NotFound}>
            <h1>Такой страницы не существует. Вернитесь на главную</h1>

            <Button href="/">Вернуться</Button>
        </div>
    )
}
