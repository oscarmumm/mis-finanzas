import { useContext } from 'react';
import { AppDataContext } from '../context/AppDataContext';

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (!context)
        throw new Error('useAppData debe usarse dentro de AppDataProvider');
    return context;
};
