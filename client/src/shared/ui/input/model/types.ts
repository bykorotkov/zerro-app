import { InputHTMLAttributes } from "react"

export type InputType =
    | 'text'
    | 'tel'
    | 'password'
    | 'email'
    | 'number'
    | 'file'
    ;

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
    // className?: string
    type?: InputType
    // placeholder?: string
    // onChange?: ChangeEventHandler<HTMLInputElement>
    // value?: string
    // id?: string
    // name?: string
    isError?: boolean
    mask?: string
    maskReplacement?: Record<string, RegExp>;
}
