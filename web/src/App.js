import React from 'react';
import Router from './routes';
import './global.css';
import { GlobalProvider } from './context/GlobalState';
import useTheme from './utils/theme';

function App() {

    const [theme, setTheme] = useTheme();

    return (
        <GlobalProvider>
            <div className={theme}>
                <Router />
            </div>
        </GlobalProvider>
    );
}

export default App;
