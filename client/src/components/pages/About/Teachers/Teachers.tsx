import classes from './Teachers.module.scss'
import Container from "@/components/global/Container/Container"
import {AboutPageTeachersTypes} from "@/types/about/page.ts";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useState} from "react";
import cn from "classnames";
import {CSSTransition, TransitionGroup} from "react-transition-group";

type TeachersProps = {
    data: AboutPageTeachersTypes
}

const Teachers = ({data}: TeachersProps) => {
    const [activeTeacherIndex, setActiveTeacherIndex] = useState(0)

    const changeTeacher = (index: number) => {
        setActiveTeacherIndex(index)
    }

    console.log(activeTeacherIndex)

    return (
        <section className={classes.Wrap}>
            <Container>
                <div className={classes.Outer}>
                    <div className={classes.Left}>
                        {data.title ? <h2 className={classes.Title} dangerouslySetInnerHTML={{__html: data.title}} /> : null}

                        {data.items && data.items.length ? (
                            <div className={classes.Previews}>
                                {data.items.map((item, index) => (
                                    <div className={cn(classes.Preview, activeTeacherIndex === index && classes.ActivePreview)} key={item.id} onClick={() => changeTeacher(index)}>
                                        <LazyLoadImage src={item.preview} alt={''} />
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {data.items && data.items.length ? (
                        <TransitionGroup>
                            <CSSTransition
                                key={data.items[activeTeacherIndex].id}
                                timeout={300}
                                classNames={{
                                    enter: classes.cardEnter,
                                    enterActive: classes.cardEnterActive,
                                    exit: classes.cardExit,
                                    exitActive: classes.cardExitActive,
                                }}
                            >
                        <div className={classes.Card} key={data.items[activeTeacherIndex].id}>
                            <LazyLoadImage className={classes.Image} src={data.items[activeTeacherIndex].image} alt={''} />

                            <div className={classes.Inner}>
                                <div className={classes.CardTop}>
                                    <div className={classes.Name} dangerouslySetInnerHTML={{__html: data.items[activeTeacherIndex].name}} />
                                    <div className={classes.Text} dangerouslySetInnerHTML={{__html: data.items[activeTeacherIndex].text}} />
                                </div>

                                {data.items[activeTeacherIndex].shields && data.items[activeTeacherIndex].shields.length ? (
                                    <div className={classes.Shields}>
                                        {data.items[activeTeacherIndex].shields.map((el, i) => (
                                            <div key={i} className={classes.Shield} dangerouslySetInnerHTML={{__html: el}} />
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                            </CSSTransition>
                        </TransitionGroup>
                    ) : null}
                </div>
            </Container>
        </section>
    )
}

export default Teachers