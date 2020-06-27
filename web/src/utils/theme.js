import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export default function useTheme() {
    const _theme = localStorage.getItem('theme') ?? (useMediaQuery({ query : '(prefers-color-scheme: dark)'}) ? 'dark-theme': 'light-theme');
    const [theme, setTheme] = useState(_theme);

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme])

    return [
        theme,
        setTheme
    ];

}