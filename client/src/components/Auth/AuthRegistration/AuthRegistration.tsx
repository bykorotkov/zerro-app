import classes from './AuthRegistration.module.scss'
import Button from "@/components/ui/Button/Button.tsx";
import Input from "@/components/ui/Input/Input.tsx";
import Loader from "@/components/ui/Loader/Loader.tsx";
import {useState} from "react";
import {useFormik} from "formik";
import {useMutation} from "@tanstack/react-query";
import {signUpUser} from "@/app/api.ts";
import PasswordIcon from "@/images/icons/PasswordIcon.tsx";
import {useAuth} from "@/context/useAuthContext.tsx";

interface AuthRegistrationProps {
    toggleAuthMode: () => void
}

interface FormData {
    username: string
    phone: string
    email: string
    password: string
}

const AuthRegistration = ({toggleAuthMode}: AuthRegistrationProps) => {
    const [error, setError] = useState<string | null>(null)
    const [passwordShown, setPasswordShown] = useState<boolean>(false)
    const {setIsLoginMode} = useAuth()

    const mutation = useMutation( {
        mutationFn: signUpUser,
        onSuccess: () => {
            setIsLoginMode(true)
        },
        onError: (error: Error) => {
            setError(error.message)
        }
    })

    const formik = useFormik<FormData>({
        initialValues: {
            username: '',
            phone: '',
            email: '',
            password: ''
        },
        initialErrors: {
            username: '',
            email: '',
            phone: '',
            password: ''
        },
        validate: values => {
            const errors: Partial<FormData> = {}
            if (!values.username) {
                errors.username = 'Поле обязательно для заполнения';
            }

            if (!values.phone) {
                errors.phone = 'Поле обязательно для заполнения';
            } else if (values.phone.length < 18) {
                errors.phone = 'Введите номер полностью'
            }

            if (!values.email) {
                errors.email = 'Поле обязательно для заполнения';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Введите корректный email';
            }

            if (!values.password) {
                errors.password = 'Поле обязательно для заполнения';
            } else if (values.password.length <= 3) {
                errors.password = 'Поле должно содержать не менее 4'
            }

            return errors
        },
        validateOnMount: false,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values) => handleRegistration(values)
    })

    const handleRegistration = async (values: FormData) => {
        // const body = JSON.stringify(values)

        mutation.mutate(values)
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown)
    }

    return (
        <div className={classes.Wrap}>
            <div className={classes.Inner}>
                <h1>Форма регистрации</h1>

                <form onSubmit={formik.handleSubmit} className={classes.Form}>
                    <div className={classes.InputItem}>
                        <Input value={formik.values.username} type={'text'} id={'username'} name={'username'} placeholder={'Ваше имя...'} onChange={formik.handleChange} onBlur={formik.handleBlur} isError={Boolean(formik.errors.username && formik.touched.username)} />
                        {formik.errors.username && formik.touched.username ? <div className={classes.Caption}>{formik.errors.username}</div> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input value={formik.values.phone} type={'tel'} id={'phone'} name={'phone'} placeholder={'Ваш телефон...'} onChange={formik.handleChange} onBlur={formik.handleBlur} isError={Boolean(formik.errors.phone && formik.touched.phone)} />
                        {formik.errors.phone && formik.touched.phone ? <div className={classes.Caption}>{formik.errors.phone}</div> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input value={formik.values.email} type={'text'} id={'email'} name={'email'} placeholder={'Ваш email...'} onChange={formik.handleChange} onBlur={formik.handleBlur} isError={Boolean(formik.errors.email && formik.touched.email)} />
                        {formik.errors.email && formik.touched.email ? <div className={classes.Caption}>{formik.errors.email}</div> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input value={formik.values.password} type={passwordShown ? 'text' : 'password'} id={'password'} name={'password'} placeholder={'Ваш пароль...'} onChange={formik.handleChange} onBlur={formik.handleBlur} isError={Boolean(formik.errors.password && formik.touched.password)} />
                        <div onClick={togglePassword} className={classes.PassIcon}>
                            <PasswordIcon />
                        </div>

                        {formik.errors.password && formik.touched.password ? <div className={classes.Caption}>{formik.errors.password}</div> : null}
                    </div>

                    {error ?
                        <div className={classes.Caption} dangerouslySetInnerHTML={{__html: error}} />
                        : null}

                    {mutation.isPending && <Loader />}

                    <Button className={classes.Button} type={'submit'}>Зарегистрироваться</Button>
                    <Button onClick={toggleAuthMode} className={classes.Button}>Перейти к авторизации</Button>
                </form>
            </div>
        </div>
    );
};

export default AuthRegistration;