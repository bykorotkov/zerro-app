import { useState } from "react"
import { useAuth } from "@/app/providers/useAuthContext.tsx"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../../api"
import { AuthLoginFormData, AuthLoginResponse } from "@/app/types/authTypes.ts"
import { useFormik } from "formik"

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const { login } = useAuth()
    const navigate = useNavigate()

    const mutation = useMutation( {
        mutationFn: loginUser,
        onSuccess: (data: AuthLoginResponse) => {
            const token = data.accessToken
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
        onSubmit: (values) => handleLogin(values)
    })

    const handleLogin = async (values: Required<AuthLoginFormData>) => {
        // const body = JSON.stringify(values)

        mutation.mutate(values)
    }

    return { formik, error, mutation }
}