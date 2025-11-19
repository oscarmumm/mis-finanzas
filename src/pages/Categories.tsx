import { useMemo } from 'react';
import { useCategories } from '../hooks/useCategories';
import type { Category } from '../types';

export const Categories = () => {
    const { categories } = useCategories();

    const incomeCategories = useMemo(() => {
        return categories.filter((category) => category.type === 'income');
    }, [categories]);

    const expenseCategories = useMemo(() => {
        return categories.filter((category) => category.type === 'expense');
    }, [categories]);

    return (
        <div className='p-3 text-indigo-900'>
            <div className='bg-white pt-5 pb-3 mb-20 rounded-3xl shadow-xl/20 flex flex-col'>
                <span className='px-5 mb-3 font-semibold text-2xl'>
                    Categorías
                </span>
                <ul>
                    {incomeCategories.map((category: Category) => (
                        <li>{category.name}</li>
                    ))}
                </ul>
                <ul>
                    {expenseCategories.map((category: Category) => (
                        <li>{category.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
