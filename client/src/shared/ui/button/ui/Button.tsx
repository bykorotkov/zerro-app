import type { ButtonProps, LinkButtonProps, PolymorphicButtonProps } from "../model/types.ts"
import { getButtonClass, getLinkClass } from "@/shared/ui/button/lib/getButtonClass.ts"

export const Button = ({ children = `button`, variant = `primary`, className, ...props }: PolymorphicButtonProps) => {
    return `href` in props ? (
        <a
            className={getLinkClass(variant, className)}
            {...(props as LinkButtonProps)}
        >
            {children}
        </a>
    ) : (
        <button
            className={getButtonClass(variant, className)}
            {...(props as ButtonProps)}
        >
            {children}
        </button>
    )
}
