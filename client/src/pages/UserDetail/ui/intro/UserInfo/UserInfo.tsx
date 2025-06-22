import classes from "../Intro.module.scss"
import { Button } from "@/shared/ui/button"
import { UserType } from "@/app/types/global.ts"

interface UserInfoProps {
    user: UserType
}

export const UserInfo = ({ user }: UserInfoProps) => {
    return (
        <>
            <p>Номер пользователя: {user.id}</p>
            {user.phone ? (
                <div className={classes.Line}>
                    <span>Телефон:</span> <Button href={`tel: ${user.phone}`}>{user.phone}</Button>
                </div>
            ) : null}

            {user.email ? (
                <div className={classes.Line}>
                    <span>E-mail:</span> <Button href={`mailto: ${user.email}`}>{user.email}</Button>
                </div>
            ) : null}

            <div className={classes.Line}>
                <span>Чат:</span> {user.banned ? user.banned : "Активен"}
            </div>

            {user.banReason ? (
                <div className={classes.Line}>
                    <span>Причина бана:</span> {user.banReason}
                </div>
            ) : null}
        </>
    )
}
