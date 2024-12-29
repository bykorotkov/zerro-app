import Button from "@/components/ui/Button/Button.tsx";
import classes from './NotFound.module.scss'

const NotFound = () => {
    return (
        <div className={classes.NotFound}>
            <h1>Такой страницы не существует. Вернитесь на главную</h1>

            <Button href={'/'}>Вернуться</Button>
        </div>
    );
};

export default NotFound;