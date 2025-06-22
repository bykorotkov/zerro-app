import cn from "classnames"
import classes from "@/shared/ui/input/ui/Input.module.scss"
import { forwardRef } from "react"
import { InputProps } from "@/shared/ui/input/model/types.ts"

export const BaseInput = forwardRef<HTMLInputElement, InputProps>(
    ({ className, isError, ...props }, ref) => (
        <input
            ref={ref}
            className={cn(classes.Input, {[classes.Error]: isError}, className)}
            {...props}
        />
    )
);