import '@testing-library/jest-dom';
import {render, screen, fireEvent} from "@testing-library/react";
import Button from "./Button.tsx";

describe('Button component', () => {
    test('renders a primary button with children', () => {
        render(<Button>Нажми меня</Button>)
        // const buttonElement = screen.getByRole('button', {name: /click me/i});
        const buttonElement = screen.getByText(/Нажми меня/i);
        expect(buttonElement).toBeInTheDocument()
        // expect(buttonElement).toHaveClass('Primary')
    })

    test('calls onClick handler when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);

        const buttonElement = screen.getByText(/Click Me/i);
        fireEvent.click(buttonElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('renders as a link when href is provided', () => {
        render(<Button href="https://example.com">Go to Example</Button>);

        const linkElement = screen.getByText(/Go to Example/i);
        expect(linkElement).toBeInTheDocument();
        expect(linkElement.tagName).toBe('A');
        expect(linkElement).toHaveAttribute('href', 'https://example.com');
    });
})