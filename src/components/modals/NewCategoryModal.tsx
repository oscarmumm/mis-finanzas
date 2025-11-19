import { MdClose } from 'react-icons/md';
import type { Category } from '../../types';

type NewCategoryModalProps = {
    closeModal: () => void;
};

export const NewCategoryModal = ({ closeModal }: NewCategoryModalProps) => {
    return (
        <div className='h-screen w-screen fixed top-0 left-0 bg-slate-900/50 z-20 flex flex-col items-center justify-center'>
            <div className='bg-white pt-5 p-3 mb-20 rounded-3xl shadow-xl/20 flex flex-col min-w-xs'>
                <div className='flex items-center justify-between mb-3'>
                    <h3 className='px-5 font-semibold text-2xl'>
                        Nueva Categoría
                    </h3>
                    <button className='p-3 text-3xl' onClick={closeModal}>
                        <MdClose />
                    </button>
                </div>
                <form className='flex flex-col'>
                    <div className='flex flex-col mb-3'>
                        <label className='m-2 font-semibold'>Nombre</label>
                        <input
                            type='text'
                            className='bg-indigo-50 p-3 rounded-xl shadow-inner resize-none outline-none'
                        />
                    </div>
                    <label className='m-2 font-semibold'>Tipo</label>
                    <div className='flex flex-col mb-3'>
                        <select
                            name=''
                            id=''
                            className='bg-indigo-50 p-3 rounded-xl shadow-inner resize-none outline-none'
                        >
                            <option value=''>Seleccione una opción</option>
                            <option value=''>Ingresos</option>
                            <option value=''>Gastos</option>
                        </select>
                    </div>
                    <button className='bg-indigo-600 rounded-xl shadow-xl text-white p-3 mt-3 font-semibold'>
                        Guardar
                    </button>
                </form>
            </div>
        </div>
    );
};
