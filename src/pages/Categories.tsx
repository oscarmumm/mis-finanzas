import { useMemo, useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import type { Category } from '../types';
import { NewCategoryModal } from '../components/modals/NewCategoryModal';

export const Categories = () => {
    const { categories } = useCategories();
    const [newCategoryModalActive, setNewCategoryModalActive] =
        useState<boolean>(false);

    const incomeCategories = useMemo(() => {
        return categories.filter((category) => category.type === 'income');
    }, [categories]);

    const expenseCategories = useMemo(() => {
        return categories.filter((category) => category.type === 'expense');
    }, [categories]);

    const closeModal = () => {
        setNewCategoryModalActive(false);
    };
    return (
        <div className='p-3 text-indigo-900'>
            <div className='bg-white pt-5 p-3 mb-20 rounded-3xl shadow-xl/20 flex flex-col'>
                <h3 className='px-5 mb-3 font-semibold text-2xl'>Categorías</h3>
                <span className='px-5 mb-3 font-semibold text-xl text-center'>
                    Ingresos
                </span>
                <ul className='m-3 mb-5 rounded-xl shadow-xl overflow-hidden'>
                    {incomeCategories.map((category: Category) => (
                        <li
                            key={category.categoryId}
                            className='p-3 text-center bg-indigo-100'
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
                <span className='px-5 mb-3 font-semibold text-xl text-center'>
                    Gastos
                </span>
                <ul className='m-3 mb-5 rounded-xl shadow-xl overflow-hidden'>
                    {expenseCategories.map((category: Category) => (
                        <li
                            key={category.categoryId}
                            className='p-3 text-center bg-indigo-100'
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
                <button
                    className='bg-indigo-600 rounded-xl shadow-xl text-white p-3 mt-3 font-semibold'
                    onClick={() => setNewCategoryModalActive(true)}
                >
                    New Category
                </button>
            </div>
            {newCategoryModalActive && (
                <NewCategoryModal closeModal={closeModal} />
            )}
        </div>
    );
};
