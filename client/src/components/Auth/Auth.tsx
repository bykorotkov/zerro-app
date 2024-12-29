import {useAuth} from "@/context/useAuthContext.tsx";
import Button from "@/components/ui/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import Input from "@/components/ui/Input/Input.tsx";
import classes from './Auth.module.scss'

interface FormData {
    name: string
    phone: string
    email: string
}

const Auth = () => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const formik = useFormik<FormData>({
        initialValues: {
            name: '',
            phone: '',
            email: ''
        },
        initialErrors: {
          name: '',
          email: '',
          phone: ''
        },
        validate: values => {
            const errors: Partial<FormData> = {}
            if (!values.name) {
                errors.name = 'Поле обязательно для заполнения';
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
            return errors
        },
        validateOnMount: false,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values) => handleLogin(values)
    })

    const handleLogin = (values: FormData) => {
        const formData = new FormData()

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value)
        })

        try {
            console.log(formData)

            login()
            navigate('/')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={classes.Wrap}>
            <div className={classes.Inner}>
                <h1>Форма логина</h1>

                <form onSubmit={formik.handleSubmit} className={classes.Form}>
                    <div className={classes.InputItem}>
                        <Input value={formik.values.name} type={'text'} id={'name'} name={'name'} placeholder={'Ваше имя...'} onChange={formik.handleChange} onBlur={formik.handleBlur} isError={Boolean(formik.errors.name && formik.touched.name)} />
                        {formik.errors.name && formik.touched.name ? <div className={classes.Caption}>{formik.errors.name}</div> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input value={formik.values.phone} type={'tel'} id={'phone'} name={'phone'} placeholder={'Ваш телефон...'} onChange={formik.handleChange} onBlur={formik.handleBlur} isError={Boolean(formik.errors.phone && formik.touched.phone)} />
                        {formik.errors.phone && formik.touched.phone ? <div className={classes.Caption}>{formik.errors.phone}</div> : null}
                    </div>

                    <div className={classes.InputItem}>
                        <Input value={formik.values.email} type={'text'} id={'email'} name={'email'} placeholder={'Ваш email...'} onChange={formik.handleChange} onBlur={formik.handleBlur} isError={Boolean(formik.errors.email && formik.touched.email)} />
                        {formik.errors.email && formik.touched.email ? <div className={classes.Caption}>{formik.errors.email}</div> : null}
                    </div>

                    <Button className={classes.Button} type={'submit'}>Войти</Button>
                </form>
            </div>
        </div>
    );
};

export default Auth;