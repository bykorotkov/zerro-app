import type { ReactNode } from "react"

export type LinkTarget = `_self` | `_blank`

export interface LinkProps {
    href: string
    target?: LinkTarget
    className?: string
    children: ReactNode
    isExternal?: boolean
}
