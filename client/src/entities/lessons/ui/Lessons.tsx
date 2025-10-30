import classes from "./Lessons.module.scss";
import { Container } from "@/shared/ui/сontainer";
import { Button } from "@/shared/ui/button";
import { useGetLessonsQuery } from "@/entities/lessons/api/getLessons.ts";

export const Lessons = () => {
    const { data: lessons, isLoading, isError, error } = useGetLessonsQuery();

    if (isLoading) return <div>Загрузка урока...</div>;
    if (isError) return <div>Ошибка: {error.toString()}</div>;
    return (
        <div className={classes.Learning}>
            <Container>
                {lessons && lessons.length ? (
                    <div className={classes.Lessons}>
                        {lessons.map((lesson) => (
                            <div
                                key={lesson.id}
                                className={classes.Lesson}
                            >
                                <div className={classes.Top}>
                                    <div className={classes.Title}>
                                        <span>Название курса:</span> {lesson.title}
                                    </div>
                                    <div className={classes.Subject}>
                                        <span>Предмет:</span> {lesson.subject}
                                    </div>
                                    <div className={classes.Descrip}>
                                        <span>Описание:</span> {lesson.description}
                                    </div>
                                    <div className={classes.Teacher}>
                                        <span>Преподаватель:</span> {lesson.teacherId}
                                    </div>
                                </div>

                                <Button
                                    href={`/subject/${lesson.id}`}
                                    className={classes.Link}
                                    variant={`secondary`}
                                >
                                    Ссылка на детальную страницу предмета
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : null}
            </Container>
        </div>
    );
};
