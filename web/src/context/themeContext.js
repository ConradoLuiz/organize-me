import React, { createContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';


let _theme;

export const ThemeContext = createContext(_theme);

export function ThemeProvider({ children }) {
    
    _theme = localStorage.getItem('theme') ?? (useMediaQuery({ query: '(prefers-color-scheme: dark)' }) ? 'dark-theme' : 'light-theme');

    const [theme, setTheme] = useState(_theme);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        
    }, [theme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme
        }}>
            { children }
        </ThemeContext.Provider>
    )
}