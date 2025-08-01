import { useEffect, useState } from "react"
import type { Theme } from "../model/types.ts"

const themes: Theme[] = [`light`, `dark`]

export const useTheme = () => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
        return (localStorage.getItem(`themeType`) as Theme) || themes[0]
    })

    const themeChanger = () => {
        const currentIndex = themes.indexOf(currentTheme)
        const nextIndex = (currentIndex + 1) % themes.length
        setCurrentTheme(themes[nextIndex])
    }

    useEffect(() => {
        localStorage.setItem(`themeType`, currentTheme)
        const layout = document.getElementById(`Layout`)
        if (layout) {
            layout.setAttribute(`data-theme`, currentTheme)
        }
    }, [currentTheme])

    return { currentTheme, themeChanger }
}
