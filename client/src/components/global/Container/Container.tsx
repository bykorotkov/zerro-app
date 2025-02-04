import classes from './Container.module.scss'

interface ContainerTypes {
    children: React.ReactNode
}

const Container = ({children}: ContainerTypes) => {
    return (
        <div className={classes.Container}>
            {children}
        </div>
    );
};

export default Container;