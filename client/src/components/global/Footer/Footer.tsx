import classes from './Footer.module.scss'
import Container from "@/components/global/Container/Container.tsx";
import Button from "@/components/ui/Button/Button.tsx";

const Footer = () => {
    const toTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

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

export default Footer;