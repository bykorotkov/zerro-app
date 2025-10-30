import classes from "./SubjectDetail.module.scss";
import { useGetLessonByIdQuery } from "@/entities/lessons/api/getLessons.ts";
import { useParams } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Layout from "@/app/layout/Layout.tsx";
import { Container } from "@/shared/ui/сontainer";
import { Button } from "@/shared/ui/button";

export const SubjectDetail = () => {
    const params = useParams<{ id: string }>();
    const idParam = params.id;

    const lessonId = idParam ? Number(idParam) : undefined;

    const { data: lesson, isLoading, isError, error } = useGetLessonByIdQuery(lessonId!, { skip: !lessonId });

    if (!lessonId || !lesson) return <NotFound />;
    if (isLoading) return <div>Загрузка урока...</div>;
    if (isError) return <div>Ошибка: {error.toString()}</div>;

    return (
        <Layout>
            <Container>
                <div className={classes.Subject}>
                    <h1>Название курса: {lesson.title}</h1>
                    <p>Название предмета: {lesson.subject}</p>
                    <p>Описание: {lesson.description}</p>
                    <p>Преподаватель курса: {lesson.teacherId}</p>
                    <p>Длительность курса: {lesson.duration} занятий</p>
                    <p>
                        Ссылка на урок: <Button href={lesson.url}>Ссылка для перехода</Button>
                    </p>
                </div>
            </Container>
        </Layout>
    );
};
