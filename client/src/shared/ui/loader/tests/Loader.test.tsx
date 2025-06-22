import {render, screen} from "@testing-library/react";
import { Loader } from "../ui/Loader.tsx"
import '@testing-library/jest-dom';
import classes from '../ui/Loader.module.scss'
import cn from "classnames";

describe('loader component', () => {
    test('renders without crashing', () => {
        render(<Loader />);
        const loader = screen.getByTestId(/loader/i)
        expect(loader).toBeInTheDocument()
        expect(loader).toHaveClass(`${cn(classes.Loader, classes.Default)}`)
    })

    test('renders with red type', () => {
        render(<Loader type={'red'} />)
        const loader = screen.getByTestId(/loader/i)
        expect(loader).toHaveClass(`${cn(classes.Loader, classes.Red)}`)
    })

    test('renders with green type', () => {
        render(<Loader type={'green'} />)
        const loader = screen.getByTestId(/loader/i)
        expect(loader).toHaveClass(`${cn(classes.Loader, classes.Green)}`)
    })
})