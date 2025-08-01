import { InputMask } from "@react-input/mask"
import cn from "classnames"
import classes from "@/shared/ui/input/ui/Input.module.scss"
import { forwardRef } from "react"
import type { InputProps } from "@/shared/ui/input/model/types.ts"

export const PhoneInput = forwardRef<HTMLInputElement, InputProps>(({ className, isError, value = ``, ...props }, ref) => (
    <InputMask
        replacement={{ _: /\d/ }}
        mask="+7 (___) ___-__-__"
        className={cn(classes.Input, { [classes.Error]: isError }, className)}
        ref={ref}
        value={value}
        {...props}
    />
))
