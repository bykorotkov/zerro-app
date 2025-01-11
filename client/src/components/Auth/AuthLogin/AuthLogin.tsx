import {useAuth} from "@/context/useAuthContext.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import Input from "@/components/ui/Input/Input.tsx";
import classes from './AuthLogin.module.scss'
import {loginUser} from "@/app/api.ts";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import Loader from "@/components/ui/Loader/Loader.tsx";
import {
    AuthLoginFormData, AuthLoginResponse,
} from "@/types/authTypes.ts";

interface AuthLoginProps {
    toggleAuthMode: () => void
}

const AuthLogin = ({toggleAuthMode}: AuthLoginProps) => {
    const [error, setError] = useState<string | null>(null)
    const { login } = useAuth()
    const navigate = useNavigate()

    const mutation = useMutation( {
        mutationFn: loginUser,
        onSuccess: (data: AuthLoginResponse) => {
            const token = data.token
            login(token)
            navigate('/')
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    const formik = useFormik<Required<AuthLoginFormData>>({
        initialValues: {
            email: '',
            password: ''
        },
        initialErrors: {
            email: '',
            password: ''
        },
        validate: values => {
            const errors: Partial<AuthLoginFormData> = {}
            if (!values.password) {
                errors.password = 'Поле обязательно для заполнения';
            } else if (values.password.length <= 4) {
                errors.password = 'Поле должно иметь не менее 4 символов'
            }

            if (!values.email) {
                errors.email = 'Поле обязательно для заполнения';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Введите корректный email';
            }
            return errors
        },
        validateOnMount: false,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values) => handleLogin(values)
    })

    const handleLogin = async (values: Required<AuthLoginFormData>) => {
        const body = JSON.stringify(values)

        mutation.mutate(body)
    }

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

                    <Button className={classes.Button} type={'button'} onClick={toggleAuthMode}>Перейти к регистрации</Button>
                    <Button className={classes.Button} type={'submit'}>Войти</Button>
                </form>
            </div>
        </div>
    );
};

export default AuthLogin;