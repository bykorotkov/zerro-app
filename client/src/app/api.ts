import {IAuthResponse} from "@/types/types.ts";

const BaseUrl = 'http://localhost:5000'

const Api = {
    // getUsers: async (): Promise<IBaseResponse> => {
    //     const response: any = await fetch(`${BaseUrl}/users`, {
    //         method: 'GET'
    //     })
    //
    //     if (!response.ok) {
    //         throw new Error('Данные пользователей не могут быть показаны')
    //     }
    //
    //     return await response.json()
    // },
    loginUser: async (data: string): Promise<IAuthResponse> => {
         const response = await fetch(`${BaseUrl}/auth/login`, {
             method: 'POST',
             body: data,
             headers: {
                'Content-Type': 'application/json'
             }
         })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Залогиниться не удалось');
        }

        return await response.json()
    },
    signUpUser: async (data: string): Promise<IAuthResponse> => {
        const response = await fetch(`${BaseUrl}/auth/registration`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Регистрация не удалась');
        }

        return await response.json()
    }
}

export const { loginUser, signUpUser } = Api