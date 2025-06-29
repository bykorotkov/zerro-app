import { useState } from "react"
import { useAuth } from "@/app/providers/useAuthContext.tsx"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { FormData } from "../../model/types/types.ts"
import { signUpUser } from "@/features/auth/api"

export const useRegister = () => {
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

    return { togglePassword, error, formik, mutation, passwordShown }
}