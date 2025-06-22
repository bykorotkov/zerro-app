import classes from './Footer.module.scss'
import { Container } from "@/shared/ui/сontainer/ui/Container.tsx"
import {Button} from "@/shared/ui/button/ui/Button.tsx";
import { useScrollTop } from "@/widgets/footer/model/hooks/useScrollTop.ts"

export const Footer = () => {
    const { toTop } = useScrollTop();

    return (
        <footer className={classes.Footer}>
            <Container>
                <div className={classes.Inner}>
                    <Button onClick={toTop} className={classes.Logo}>Zerro</Button>

                    <div className={classes.Right}>&copy; Все права защищены</div>
                </div>
            </Container>
        </footer>
    );
};