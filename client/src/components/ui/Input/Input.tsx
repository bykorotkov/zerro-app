import classes from './Input.module.scss'
import cn from "classnames";
import {ChangeEventHandler, InputHTMLAttributes} from "react";
import {InputMask} from '@react-input/mask';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
    className?: string
    type?: string
    placeholder?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    value: string
    id?: string
    name?: string
    isError?: boolean
}

const Input = ({className, type, placeholder, onChange, value, name, id, isError, ...otherProps}: InputProps) => {

    return (
       <>
           {type !== undefined && type === 'tel'   ? (
               <InputMask
                   replacement={{ _: /\d/ }}
                   mask={'+7 (___) ___-__-__'}
                   id={id}
                   name={name}
                   className={cn(classes.Input, {[classes.Error]: isError}, className)}
                   onChange={onChange}
                   type={type}
                   placeholder={placeholder}
                   value={value}
                   {...otherProps}
               />
           ) : (
               <input
                   id={id}
                   name={name}
                   className={cn(classes.Input, {[classes.Error]: isError}, className)}
                   type={type}
                   placeholder={placeholder}
                   onChange={onChange}
                   value={value}
                   {...otherProps}
               />
           )}
       </>
    );
};

export default Input;