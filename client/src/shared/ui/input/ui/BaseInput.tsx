import cn from "classnames"
import classes from "@/shared/ui/input/ui/Input.module.scss"
import { forwardRef } from "react"
import type { InputProps } from "@/shared/ui/input/model/types.ts"

export const BaseInput = forwardRef<HTMLInputElement, InputProps>(({ className, isError, value = ``, ...props }, ref) => (
    <input
        ref={ref}
        className={cn(classes.Input, { [classes.Error]: isError }, className)}
        value={value}
        {...props}
    />
))
