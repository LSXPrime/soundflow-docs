import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import {HeroUIProvider} from '@heroui/react';
import App from './App.tsx';
import 'katex/dist/katex.min.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter>
            <HeroUIProvider>
                <App/>
            </HeroUIProvider>
        </HashRouter>
    </StrictMode>
);