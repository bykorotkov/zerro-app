export interface AuthLoginFormData {
    email: string
    password: string
}

export type RequiredAuthLoginFormData<T> = {
    [K in keyof T]-? : T[K]
}

export type PartialAuthLoginErrorsFormData<T> = {
    [K in keyof T]?: T[K]
}

export interface AuthLoginResponse {
    token: string
}