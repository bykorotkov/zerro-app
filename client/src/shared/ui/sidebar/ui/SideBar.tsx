import classes from "./SideBar.module.scss"
import { LazyLoadImage } from "react-lazy-load-image-component"
import photo from "@/shared/assets/images/temp/person_photo.webp"
import { Button } from "@/shared/ui/button/ui/Button.tsx"
import type { UserType } from "@/app/types/global.ts"

export interface SideBarProps {
    user?: UserType
}

export const SideBar = ({ user }: SideBarProps) => {
    return (
        <div className={classes.Sidebar}>
            <Button
                href={`/user/${user?.id}`}
                className={classes.Person}
            >
                <div className={classes.Photo}>
                    <LazyLoadImage
                        src={photo}
                        alt=""
                    />
                </div>

                <div className={classes.Info}>
                    <div className={classes.Name}>{user?.username}</div>
                    <div className={classes.Role}>{user?.email}</div>
                </div>
            </Button>

            <ul className={classes.Links}>
                <li className={classes.Link}>
                    <Button href="/">Главная</Button>
                </li>

                <li className={classes.Link}>
                    <Button href="/courses">Курсы</Button>
                </li>

                <li className={classes.Link}>
                    <Button href="/homework">Домашка</Button>
                </li>

                <li className={classes.Link}>
                    <Button href="/practice">Практика</Button>
                </li>

                <li className={classes.Link}>
                    <Button href="/vocabulary">Словарь</Button>
                </li>
            </ul>

            <div className={classes.Payment}>Оплачено 5 занятий</div>
        </div>
    )
}
