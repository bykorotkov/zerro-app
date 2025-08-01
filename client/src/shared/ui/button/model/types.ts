import type { ButtonHTMLAttributes, AnchorHTMLAttributes, MouseEventHandler } from "react"

export type ButtonVariant = `primary` | `secondary`
export type ButtonType = `submit` | `reset` | `button`

export interface ButtonBaseProps {
    variant?: ButtonVariant
    className?: string
    children?: React.ReactNode
    type?: ButtonType
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export type ButtonProps = ButtonBaseProps &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: never
        target?: never
    }

export type LinkButtonProps = ButtonBaseProps &
    AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string
        target?: string
    }

export type PolymorphicButtonProps = ButtonProps | LinkButtonProps
