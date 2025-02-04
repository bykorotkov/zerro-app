import classes from './Intro.module.scss';
import Container from "@/components/global/Container/Container.tsx";
import Posts from "@/components/widgets/Posts/Posts.tsx";

const Intro = () => {
    return (
        <div className={classes.Intro}>
            <Container>
                <Posts />
            </Container>
        </div>
    );
};

export default Intro;