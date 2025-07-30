import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthLoginFormData } from "@/app/types/authTypes.ts"
import { useFormik } from "formik"
import { useLoginMutation } from "@/features/auth/api/authApi.ts"
import { useAppDispatch } from "@/app/providers/store/hooks/redux.ts"
import { login } from "@/app/providers/store/reducers/authSlice.ts"

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loginUser, { isLoading }] = useLoginMutation();

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
            } else if (values.password.length <= 3) {
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
        onSubmit: async (values) => {
            try {
                await loginUser(values).unwrap()
                // dispatch(login(response.accessToken))
                dispatch(login())
                navigate('/')
            } catch (e: any) {
                setError(e.data.message || 'Ошибка при авторизации')
            }
        }
    })

    return { formik, error, isLoading }
}