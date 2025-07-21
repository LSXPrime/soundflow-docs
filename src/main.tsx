import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {HeroUIProvider} from '@heroui/react';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename="/soundflow-docs">
            <HeroUIProvider>
                <App/>
            </HeroUIProvider>
        </BrowserRouter>
    </StrictMode>
);