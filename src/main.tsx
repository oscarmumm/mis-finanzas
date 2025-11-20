import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AppRouter } from './router/AppRouter';
import { AppDataProvider } from './context/AppDataContext';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppDataProvider>
            <AppRouter />
        </AppDataProvider>
    </StrictMode>
);