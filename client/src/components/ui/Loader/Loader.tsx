import classes from './Loader.module.scss'
import cn from "classnames";
import {FC} from "react";

type LoaderProps = {
    type?: 'default' | 'red' | 'green'
}

const Loader: FC<LoaderProps> = ({type = 'default'}) => {
    return (
        <div className={classes.LoaderContainer}>
            <div data-testid="loader" className={cn(classes.Loader, {
                [classes.Default]: type === 'default',
                [classes.Red]: type === 'red',
                [classes.Green]: type === 'green',
            })}></div>
        </div>
    );
};

export default Loader;