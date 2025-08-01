import type { ReactElement } from "react"

export interface PrivateRoutProps {
    element: ReactElement
}

export interface FormData {
    username: string
    phone: string
    email: string
    password: string
}
