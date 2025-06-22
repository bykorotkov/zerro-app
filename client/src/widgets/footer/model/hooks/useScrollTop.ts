
export const useScrollTop = () => {
    const toTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return { toTop }
}
