export type Theme = `light` | `dark`

export interface ThemeContextType {
    currentTheme: Theme
    toggleTheme: () => void
}
