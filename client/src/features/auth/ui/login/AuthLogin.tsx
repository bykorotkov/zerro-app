import {Button} from "@/shared/ui/button/ui/Button.tsx";
import { Input } from "@/shared/ui/input/ui/Input.tsx"
import classes from './AuthLogin.module.scss'
import { Loader } from "@/shared/ui/loader/ui/Loader.tsx"
import { useLogin } from "../../model/hooks/useLogin.ts"

interface AuthLoginProps {
    toggleAuthMode: () => void
}

const AuthLogin = ({ toggleAuthMode }: AuthLoginProps) => {
    const {formik, error, mutation} = useLogin();

    return (
        <div className={classes.Wrap}>
            <div className={classes.Inner}>
                <h1>Форма логина</h1>

                <form onSubmit={formik.handleSubmit} className={classes.Form} data-testid={'authLoginForm'}>
                    <div className={classes.InputItem}>
                        <Input value={formik.values.email} type={'text'} id={'email'} name={'email'} placeholder={'Ваш email...'} onChange={formik.handleChange} onBlur={formik.handleBlur} isError={Boolean(formik.errors.email && formik.touched.email)} />
                        {formik.errors.email && formik.touched.email ? <div className={classes.Caption}>{formik.errors.email}</div> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input value={formik.values.password} type={'text'} id={'password'} name={'password'} placeholder={'Ваше пароль...'} onChange={formik.handleChange} onBlur={formik.handleBlur} isError={Boolean(formik.errors.password && formik.touched.password)} />
                        {formik.errors.password && formik.touched.password ? <div className={classes.Caption}>{formik.errors.password}</div> : null}
                    </div>

                    {error ?
                        <div className={classes.Caption} dangerouslySetInnerHTML={{__html: error}} />
                        : null}

                    {mutation.isPending && <Loader />}

                    <Button className={classes.Button} type={'submit'}>Войти</Button>
                    <Button className={classes.Button} type={'button'} onClick={toggleAuthMode}>Перейти к регистрации</Button>
                </form>
            </div>
        </div>
    );
};

export default AuthLogin;