
export const APP_ROUTES = {
    LOGIN: `/login`,
    HOME: `/`,
    ABOUT: `/about`,
    POSTS: {
        INDEX: `/posts`,
        DETAIL: `:id`
    },
    USER: `/user/:id`,
    NOT_FOUND: `*`
}