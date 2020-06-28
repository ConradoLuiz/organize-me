import React, { useEffect, useContext } from 'react';
import Router from './routes';
import './global.css';
import { GlobalProvider } from './context/GlobalState';
import { ThemeContext } from './context/themeContext';


function App() {

    const { theme } = useContext(ThemeContext);
    
    return (
        <GlobalProvider>
            <div className={theme}>
                <Router />
            </div>
        </GlobalProvider>
    );
}

export default App;
