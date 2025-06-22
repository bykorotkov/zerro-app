import classes from './Reviews.module.scss'
import { Container } from "@/shared/ui/сontainer/ui/Container.tsx"
import {LazyLoadImage} from "react-lazy-load-image-component";
import cn from "classnames";
import { ReviewsProps } from "@/pages/About/model/types.ts"

export const Reviews = ({data}: ReviewsProps) => {
    return (
        <section className={classes.Wrap}>
            <Container>
                {data.title ? <h2 className={classes.Title} dangerouslySetInnerHTML={{__html: data.title}} /> : null}

                {data.items && data.items.length ? (
                    <div className={classes.Reviews}>
                        <div className={cn(classes.Review, classes.FirstReview)}>
                            <div className={classes.FirstTitle}>87% из них</div>
                            <div className={classes.FirstText}>уверенно используют английский в повседневной жизни уже через 30 уроков</div>
                        </div>
                        {data.items.map((item) => (
                            <div className={classes.Review} key={item.id}>
                                <div className={classes.Top}>
                                    {item.image ? <LazyLoadImage src={item.image} alt={''} /> : null}

                                    {item.name || item.date ? (
                                        <div className={classes.Caption}>
                                            {item.name ? <div className={classes.Name} dangerouslySetInnerHTML={{__html: item.name}} /> : null}
                                            {item.date ? <div className={classes.Date} dangerouslySetInnerHTML={{__html: item.date}} /> : null}
                                        </div>
                                    ) : null}
                                </div>

                                {item.text ? <div dangerouslySetInnerHTML={{__html: item.text}} className={classes.Text} /> : null}

                                {item.shield ? <div dangerouslySetInnerHTML={{__html: item.shield}} className={classes.Shield} /> : null}
                            </div>
                        ))}
                    </div>
                ) : null}
            </Container>
        </section>
    );
};