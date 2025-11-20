import { MdClose } from 'react-icons/md';
import type { Category } from '../../types';
import { useState } from 'react';
import { useAppData } from '../../hooks/useAppData';

type NewCategoryModalProps = {
    closeModal: () => void;
};

const emptyCategory: Category = {
    categoryId: 0,
    name: '',
    type: 'income',
};

export const NewCategoryModal = ({ closeModal }: NewCategoryModalProps) => {
    const { addCategory } = useAppData();
    const [newCategory, setNewCategory] = useState<Category>(emptyCategory);

    const createNewCategory = () => {
        if (
            newCategory.name !== '' &&
            (newCategory.type === 'expense' || newCategory.type === 'income')
        ) {
            const newId = Date.now();
            const categoryToAdd = {
                ...newCategory,
                categoryId: newId,
            };

            setNewCategory(categoryToAdd);
            addCategory(categoryToAdd);
            closeModal();
        }
    };

    return (
        <div className="h-screen w-screen fixed top-0 left-0 bg-slate-900/50 z-20 flex flex-col items-center justify-center">
            <div className="bg-white pt-5 p-3 mb-20 rounded-3xl shadow-xl/20 flex flex-col min-w-xs">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="px-5 font-semibold text-2xl">
                        Nueva Categoría
                    </h3>
                    <button className="p-3 text-3xl" onClick={closeModal}>
                        <MdClose />
                    </button>
                </div>
                <form className="flex flex-col">
                    <div className="flex flex-col mb-3">
                        <label className="m-2 font-semibold">Nombre</label>
                        <input
                            type="text"
                            className="bg-indigo-50 p-3 rounded-xl shadow-inner resize-none outline-none"
                            value={newCategory.name}
                            onChange={(e) =>
                                setNewCategory((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                        />
                    </div>
                    <label className="m-2 font-semibold">Tipo</label>
                    <div className="flex flex-col mb-3">
                        <select
                            name=""
                            id=""
                            value={newCategory.type}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'income' || value === 'expense') {
                                    setNewCategory((prev) => ({
                                        ...prev,
                                        type: value,
                                    }));
                                }
                            }}
                            className="bg-indigo-50 p-3 rounded-xl shadow-inner outline-none">
                            <option className="text-sm" value="income">
                                Ingresos
                            </option>
                            <option className="text-sm" value="expense">
                                Gastos
                            </option>
                        </select>
                    </div>
                    <button
                        className="bg-indigo-600 rounded-xl shadow-xl text-white p-3 mt-3 font-semibold"
                        onClick={(e) => {
                            e.preventDefault();
                            createNewCategory();
                        }}>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};
