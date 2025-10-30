import classes from "@/pages/Learning/ui/Learning.module.scss";
import { Container } from "@/shared/ui/сontainer";

export const Intro = () => {
    return (
        <Container>
            <div className={classes.Main}>
                <h1>Страница Обучения и чат</h1>
                <h3>Здесь отображены ваши действующие и прошедшие уроки!</h3>
            </div>
        </Container>
    );
};
