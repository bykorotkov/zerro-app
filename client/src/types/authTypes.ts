export interface AuthLoginFormData {
    email: string
    password: string
}

export type AuthLogoutFormData = Pick<AuthLoginFormData, 'email'>

export interface AuthLoginResponse {
    token: string
}