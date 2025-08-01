import classes from "./AuthRegistration.module.scss"
import { Button } from "@/shared/ui/button/ui/Button.tsx"
import { Input } from "@/shared/ui/input/ui/Input.tsx"
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import PasswordIcon from "@/shared/assets/images/icons/PasswordIcon.tsx"
import { useRegister } from "../../model/hooks/useRegister.ts"
import { useAppDispatch } from "@/app/providers/store/hooks/redux.ts"
import { toggleLoginMode } from "@/app/providers/store/reducers/authSlice.ts"

const AuthRegistration = () => {
    const { passwordShown, formik, isLoading, error, togglePassword } = useRegister()
    const dispatch = useAppDispatch()

    const handleToggleMode = () => {
        dispatch(toggleLoginMode())
    }

    return (
        <div className={classes.Wrap}>
            <div className={classes.Inner}>
                <h1>Форма регистрации</h1>

                <form
                    onSubmit={formik.handleSubmit}
                    className={classes.Form}
                >
                    <div className={classes.InputItem}>
                        <Input
                            value={formik.values.username}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Ваше имя..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={Boolean(formik.errors.username && formik.touched.username)}
                        />
                        {formik.errors.username && formik.touched.username ? (
                            <div className={classes.Caption}>{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input
                            value={formik.values.phone}
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Ваш телефон..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={Boolean(formik.errors.phone && formik.touched.phone)}
                        />
                        {formik.errors.phone && formik.touched.phone ? <div className={classes.Caption}>{formik.errors.phone}</div> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input
                            value={formik.values.email}
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Ваш email..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={Boolean(formik.errors.email && formik.touched.email)}
                        />
                        {formik.errors.email && formik.touched.email ? <div className={classes.Caption}>{formik.errors.email}</div> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input
                            value={formik.values.password}
                            type={passwordShown ? `text` : `password`}
                            id="password"
                            name="password"
                            placeholder="Ваш пароль..."
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isError={Boolean(formik.errors.password && formik.touched.password)}
                        />
                        <div
                            onClick={togglePassword}
                            className={classes.PassIcon}
                        >
                            <PasswordIcon />
                        </div>

                        {formik.errors.password && formik.touched.password ? (
                            <div className={classes.Caption}>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    {error ? (
                        <div
                            className={classes.Caption}
                            dangerouslySetInnerHTML={{ __html: error }}
                        />
                    ) : null}

                    {isLoading && <Loader />}

                    <Button
                        className={classes.Button}
                        type="submit"
                    >
                        Зарегистрироваться
                    </Button>
                    <Button
                        onClick={handleToggleMode}
                        className={classes.Button}
                    >
                        Перейти к авторизации
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default AuthRegistration
