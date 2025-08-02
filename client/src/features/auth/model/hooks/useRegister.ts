import { useState } from "react";
import { useFormik } from "formik";
import type { FormData } from "../../model/types/types.ts";
import { useRegistrationMutation } from "@/features/auth/api/authApi.ts";
import { useAppDispatch } from "@/app/providers/store/hooks/redux.ts";
import { toggleLoginMode } from "@/app/providers/store/reducers/authSlice.ts";

export const useRegister = () => {
    const [error, setError] = useState<string | null>(null);
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [signUpUser, { isLoading }] = useRegistrationMutation();

    const formik = useFormik<FormData>({
        initialValues: {
            username: ``,
            phone: ``,
            email: ``,
            password: ``,
        },
        initialErrors: {
            username: ``,
            email: ``,
            phone: ``,
            password: ``,
        },
        validate: (values) => {
            const errors: Partial<FormData> = {};
            if (!values.username) {
                errors.username = `Поле обязательно для заполнения`;
            }

            if (!values.phone) {
                errors.phone = `Поле обязательно для заполнения`;
            } else if (values.phone.length < 18) {
                errors.phone = `Введите номер полностью`;
            }

            if (!values.email) {
                errors.email = `Поле обязательно для заполнения`;
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = `Введите корректный email`;
            }

            if (!values.password) {
                errors.password = `Поле обязательно для заполнения`;
            } else if (values.password.length <= 3) {
                errors.password = `Поле должно содержать не менее 4`;
            }

            return errors;
        },
        validateOnMount: false,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            try {
                await signUpUser(values).unwrap();
                dispatch(toggleLoginMode());
            } catch (e: any) {
                setError(e.message);
            }
        },
    });

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return { togglePassword, error, formik, passwordShown, isLoading };
};
