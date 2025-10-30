import { createApi } from "@reduxjs/toolkit/query/react";
import type { LessonTypes } from "@/entities/lessons/model/types";
import { BaseUrl } from "@/shared/api/axios.ts";
import { customBaseQuery } from "@/shared/api/rtkBaseQuery.ts";

export const lessonsApi = createApi({
    reducerPath: `lessonsApi`,
    baseQuery: customBaseQuery({
        baseUrl: `${BaseUrl}`,
    }),
    tagTypes: [`Lesson`], // для инвалидации кэша
    endpoints: (builder) => ({
        getLessons: builder.query<LessonTypes[], void>({
            query: () => ({
                url: `/lessons`,
                method: `GET`,
            }),
            providesTags: [`Lesson`],
        }),

        getLessonById: builder.query<LessonTypes, number>({
            query: (id) => ({
                url: `/lessons/${id}`,
                method: `GET`,
            }),
            providesTags: (_result, _error, id) => [{ type: `Lesson`, id }],
        }),

        // Опционально: мутации для создания/обновления/удаления
        createLesson: builder.mutation<LessonTypes, Partial<LessonTypes>>({
            query: (lesson) => ({
                url: `/lessons`,
                method: `POST`,
                body: lesson,
            }),
            invalidatesTags: [`Lesson`],
        }),
    }),
});

// Экспорт хуков
export const { useGetLessonsQuery, useGetLessonByIdQuery, useCreateLessonMutation } = lessonsApi;
