import React, { createContext, useEffect, useState } from 'react';

const _theme = localStorage.getItem('theme') ?? (useMediaQuery({ query: '(prefers-color-scheme: dark)' }) ? 'dark-theme' : 'light-theme');

export const ThemeContext = createContext(_theme);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(_theme);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        console.log(typeof theme);
        
    }, [theme]);

    return (
        <ThemeContext.Provider value={
            theme,
            setTheme
        }>
            { children }
        </ThemeContext.Provider>
    )
}