import '@testing-library/jest-dom';
import {fireEvent, render, screen} from "@testing-library/react";
import { Input } from "../ui/Input.tsx"

describe('input component', () => {
    test('input has value', () => {
        render(<Input value={'value'} onChange={() => {}} />)
        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
        expect(inputElement.value).toBe('value');
    })

    test('input has empty value', () => {
        render(<Input value={''} onChange={() => {}} />)
        const inputElement = screen.getByRole('textbox') as HTMLInputElement;
        expect(inputElement.value).toBe('');
    })

    test('applies correct additional class if it is provided', () => {
        render(<Input className={'Class'} value={''} onChange={() => {}} />)
        const inputElement = screen.getByRole('textbox') as HTMLInputElement
        expect(inputElement).toHaveClass('Class')
    })

    test('input updates properly on change',  () => {
        let inputValue = ''
        const handleChange = jest.fn((e) => {
            inputValue = e.target.value
        });

        const { rerender } = render(
            <Input placeholder={'input value'} onChange={handleChange} value={inputValue} />
        )
        const inputElement = screen.getByPlaceholderText(/input value/i) as HTMLInputElement;

        const newValue = 'test'
        for (const char of newValue) {
            inputValue += char
            fireEvent.change(inputElement, { target: { value: inputValue} });
            rerender(<Input placeholder={'input value'} onChange={handleChange} value={inputValue} />)
        }

        expect(handleChange).toHaveBeenCalledTimes(newValue.length);
        expect(inputElement.value).toBe(newValue)
    })

    test('phone mask has proper value on change', () => {
        let inputValue = ''
        const handleChange = jest.fn((e) => {
            inputValue = e.target.value
        });

        const { rerender } = render(<Input type={'tel'} placeholder={'phone input value'} onChange={handleChange} />)

        const inputElement = screen.getByPlaceholderText(/phone input value/i) as HTMLInputElement;

        const newPhoneVal = '+7 (960) 999-99-43'
        for (const char of newPhoneVal) {
            inputValue += char
            fireEvent.change(inputElement, {target: {value: inputValue}})
            rerender(<Input type={'tel'} placeholder={'phone input value'} onChange={handleChange} value={inputValue} />)
        }

        expect(handleChange).toHaveBeenCalledTimes(newPhoneVal.length);
        expect(inputElement.value).toBe(newPhoneVal)
        expect(inputElement.value.length).toBe(18)
    })
})