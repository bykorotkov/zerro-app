import { useEffect, useState } from "react"

export const useHeaderScroll = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isHeaderVisible, setHeaderVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset;

            if (currentPosition > scrollPosition) {
                setHeaderVisible(false)
            } else {
                setHeaderVisible(true)
            }

            setScrollPosition(currentPosition);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scrollPosition])

    return { isHeaderVisible };
}