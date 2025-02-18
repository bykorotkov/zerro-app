export interface AboutPageTypes {
    intro: AboutPageIntroTypes
    themes: AboutPageThemeTypes
    teachers: AboutPageTeachersTypes
    reviews: AboutPageReviewsTypes
}

export interface AboutPageIntroTypes {
    shields: AboutPageIntroShieldsTypes[]
    title: string
    image: string
    caption: string
}

export interface AboutPageIntroShieldsTypes {
    icon: string
    text: string
    id: number
}

export interface AboutPageThemeTypes {
    title: string;
    items: AboutPageThemeItemsTypes[]
}

export interface AboutPageThemeItemsTypes {
    title: string;
    subject: string;
    text: string;
    image: string;
    color: string;
    link: string;
    id: number
}

export interface AboutPageTeachersTypes {
    title: string
    items: AboutPageTeachersItemsTypes[]
}

export interface AboutPageTeachersItemsTypes {
    name: string;
    text: string;
    shields: string[];
    image: string;
    id: number
    preview: string;
}

export interface AboutPageReviewsTypes {
    title: string;
    items: AboutPageReviewsItemsTypes[];
}

export interface AboutPageReviewsItemsTypes {
    name: string;
    date: string;
    text: string;
    shield: string;
    image: string;
    id: number
}