
const BaseUrl = 'http://localhost:5000'

const Api = {
    getUsers: async (): Promise<any> => {
        const response: any = await fetch(`${BaseUrl}/users`, {
            method: 'GET'
        })

        if (!response.ok) {
            throw new Error('Данные пользователей не могут быть показаны')
        }

        return response.data
    },
    loginUser: async (data: FormData): Promise<any> => {
         const response = await fetch(`${BaseUrl}/auth/login`, {
            method: 'POST',
            body: data
        })

        if (!response.ok) {
            const errorData = await response.json();
            // console.error('Ошибка:', errorData);
            throw new Error(errorData || 'Залогиниться не удалось');
        }
    }
}

export const { getUsers, loginUser } = Api