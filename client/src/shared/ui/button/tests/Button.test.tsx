import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { Button } from "../ui/Button.tsx"

describe(`button component`, () => {
    test(`renders a primary button with children`, () => {
        render(<Button>Click Me</Button>)
        const buttonElement = screen.getByRole(`button`, { name: /Click Me/i }) as HTMLButtonElement
        expect(buttonElement).toBeInTheDocument()
        expect(buttonElement).toHaveClass(`Primary`)
    })

    test(`calls onClick handler when clicked`, () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>Click Me</Button>)

        const buttonElement = screen.getByText(/Click Me/i) as HTMLButtonElement
        fireEvent.click(buttonElement)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    test(`renders as a link when href is provided`, () => {
        render(<Button href="https://example.com">Go to Example</Button>)

        const linkElement = screen.getByText(/Go to Example/i) as HTMLLinkElement
        expect(linkElement).toBeInTheDocument()
        expect(linkElement.tagName).toBe(`A`)
        expect(linkElement).toHaveAttribute(`href`, `https://example.com`)
    })

    test(`applies correct class by changing variant for primary`, () => {
        render(<Button variant="primary">Click</Button>)
        const buttonElement = screen.getByText(`Click`) as HTMLButtonElement
        expect(buttonElement).toHaveClass(`Primary`)
    })

    test(`applies correct class by changing variant for secondary`, () => {
        render(<Button variant="secondary">Click</Button>)
        const buttonElement = screen.getByText(`Click`) as HTMLButtonElement
        expect(buttonElement).toHaveClass(`Secondary`)
    })

    test(`type prop applies correctly`, () => {
        render(<Button type="submit">Click</Button>)
        const buttonElement = screen.getByRole(`button`, { name: /Click/i }) as HTMLButtonElement
        expect(buttonElement).toHaveAttribute(`type`, `submit`)
    })

    test(`classname provides in button correctly`, () => {
        render(<Button className="Class">Click</Button>)
        const buttonElement = screen.getByRole(`button`, { name: /Click/i }) as HTMLButtonElement
        expect(buttonElement).toHaveClass(`Class`)
    })

    test(`target blank works correctly if we provide this attr`, () => {
        render(
            <Button
                href="/"
                target="_blank"
            >
                Click
            </Button>,
        )
        const linkElement = screen.getByRole(`link`, { name: /Click/i }) as HTMLLinkElement
        expect(linkElement).toHaveAttribute(`target`, `_blank`)
    })

    test(`does not throw error if onClick prop is not provided`, () => {
        render(<Button>Click</Button>)
        const buttonElement = screen.getByRole(`button`, { name: /Click/i }) as HTMLButtonElement
        expect(() => fireEvent.click(buttonElement)).not.toThrow()
    })

    test(`to throw an error if no children is provided`, () => {
        render(<Button />)
        const buttonElement = screen.getByRole(`button`, { name: /button/i }) as HTMLButtonElement
        expect(buttonElement).toHaveTextContent(`button`)
    })
})
