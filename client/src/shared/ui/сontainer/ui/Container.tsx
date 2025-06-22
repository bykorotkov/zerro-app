import classes from "./Container.module.scss"

export interface ContainerTypes {
    children: React.ReactNode
}

export const Container = ({ children }: ContainerTypes) => {
    return <div className={classes.Container}>{children}</div>
}
