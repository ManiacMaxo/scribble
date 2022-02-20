import React, { createContext, useEffect, useState } from 'react'

export interface IThemeContext {
    theme: string
    setTheme: (theme: string) => void
}

export const ThemeContext = createContext<IThemeContext>({
    theme: 'light',
    setTheme: () => {}
})

export const ThemeProvider: React.FC = (props) => {
    const [theme, setTheme] = useState<string>()

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme && ['dark', 'light'].includes(storedTheme))
            return setTheme(storedTheme)

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
        setTheme(prefersDark ? 'dark' : 'light')
    }, [])

    useEffect(() => {
        if (theme === undefined) return
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
        document.documentElement.classList.add(theme)
        document.documentElement.classList.remove(
            theme === 'light' ? 'dark' : 'light'
        )
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme: theme ?? 'light', setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
