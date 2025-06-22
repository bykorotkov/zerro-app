import classes from './Intro.module.scss';
import { Container } from "@/shared/ui/сontainer/ui/Container.tsx"

export const Intro = () => {
    return (
        <div className={classes.Intro}>
            <Container>
                <h1>Страница постов</h1>
                <h3>Здесь вы можете ознакомиться с существующими постами портала!</h3>
            </Container>
        </div>
    );
};