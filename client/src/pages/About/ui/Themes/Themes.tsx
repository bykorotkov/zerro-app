import classes from './Themes.module.scss'
import { Container } from "@/shared/ui/сontainer/ui/Container.tsx"
import { ThemesProps } from "../../model/types.ts"
import {LazyLoadImage} from "react-lazy-load-image-component";
import {Button} from "@/shared/ui/button/ui/Button.tsx";


export const Themes = ({data}: ThemesProps) => {
    return (
        <section className={classes.Wrap}>
            <Container>
                {data.title ? <h2 className={classes.Title} dangerouslySetInnerHTML={{__html: data.title}} /> : null}

                {data.items && data.items.length ? (
                    <div className={classes.Items}>
                        {data.items.map((item) => (
                            <Button href={item.link} className={classes.Item} key={item.id} style={{backgroundColor: item.color}}>
                                <div className={classes.Info}>
                                    <div className={classes.Name} dangerouslySetInnerHTML={{__html: item.title}} />
                                    <div className={classes.Subject} dangerouslySetInnerHTML={{__html: item.subject}} />
                                    <div className={classes.Text} dangerouslySetInnerHTML={{__html: item.text}} />
                                </div>

                                <div className={classes.Button}><p>Подробнее</p></div>

                                <LazyLoadImage className={classes.Image} src={item.image} alt={''} />
                            </Button>
                        ))}
                    </div>
                ) : null}
            </Container>
        </section>
    )
}