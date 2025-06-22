import { InputProps } from "../model/types.ts"
import { PhoneInput } from "@/shared/ui/input/ui/PhoneInput.tsx"
import { BaseInput } from "@/shared/ui/input/ui/BaseInput.tsx"

export const Input = (props: InputProps) => {
    return props.type === "tel" ? <PhoneInput {...props} /> : <BaseInput {...props} />
}
