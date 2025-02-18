import classes from './Intro.module.scss'
import Container from "@/components/global/Container/Container.tsx";
import {AboutPageIntroTypes} from "@/types/about/page.ts";

interface IntroProps {
    data: AboutPageIntroTypes
}

const Intro = ({data}: IntroProps) => {
    return (
        <div className={classes.Intro}>
            <Container>
                {data.shields && data.shields.length ?
                    <div className={classes.Shields}>
                        {data.shields.map((item) => (
                            <div className={classes.Shield} key={item.id}>
                                <img src={item.icon} alt={''} />
                                <div dangerouslySetInnerHTML={{__html: item.text}} />
                            </div>
                        ))}
                    </div>
                : null}

                {data.title || data.image ? (
                    <div className={classes.Content}>
                        {data.title || data.caption ? (
                            <div className={classes.Left}>
                                {data.title ? <h1 dangerouslySetInnerHTML={{__html: data.title}} className={classes.Title} /> : null}
                                {data.caption ? <p dangerouslySetInnerHTML={{__html: data.caption}} className={classes.Caption} /> : null}
                            </div>
                        ) : null}

                        {data.image ? <img className={classes.Image} src={data.image} alt={''} /> : null}
                    </div>
                ) : null}
            </Container>
        </div>
    );
};

export default Intro;