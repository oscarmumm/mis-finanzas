import { useEffect, useState } from 'react';
import type { Category } from '../types';
import { initialCategories } from '../db/sampleData';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);

    useEffect(() => {
        const stored = localStorage.getItem('categories');
        if (stored) {
            setCategories(JSON.parse(stored));
        } else {
            localStorage.setItem(
                'categories',
                JSON.stringify(initialCategories)
            );
        }
    }, []);

    const saveToStorage = (data: Category[]) => {
        localStorage.setItem('category', JSON.stringify(data));
        setCategories(data);
    };

    const addCategory = (cat: Category) => {
        const updated = [...categories, cat];
        saveToStorage(updated);
    };

    const deleteCategory = (id: number) => {
        const updated = categories.filter((cat) => cat.categoryId !== id);
        saveToStorage(updated);
    };

    return {
        categories,
        addCategory,
        deleteCategory,
    };
};
