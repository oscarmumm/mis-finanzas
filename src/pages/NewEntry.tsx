import { useAppData } from '../hooks/useAppData';

export const NewEntry = () => {
    const { categories } = useAppData();

    return (
        <div className="p-3 text-indigo-900">
            <div className="bg-white pt-5 pb-3 mb-20 rounded-3xl shadow-xl/20 flex flex-col">
                <span className="px-5 mb-3 font-semibold text-2xl">
                    Nueva transacción
                </span>
                <form className="p-3 flex flex-col">
                    <div className="flex flex-col mb-3">
                        <label className="m-2 font-semibold">
                            Tipo de transacción
                        </label>
                        <select
                            className="bg-indigo-50 p-3 rounded-xl shadow-inner resize-none outline-none"
                            name=""
                            id="">
                            <option value="">Seleccione el tipo de transacción</option>
                            <option value="">Gasto</option>
                            <option value="">Ingreso</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="m-2 font-semibold">Categoría</label>
                        <select className="bg-indigo-50 p-3 rounded-xl shadow-inner resize-none outline-none" name="" id="">
                            <option>Seleccione la categoría</option>
                            {categories.map((category) => (
                                <option
                                    key={category.categoryId}
                                    value={category.categoryId}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="m-2 font-semibold">Monto</label>
                        <input className="bg-indigo-50 p-3 rounded-xl shadow-inner resize-none outline-none" type="number" min={0}/>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="m-2 font-semibold">Descripción</label>
                        <textarea className="bg-indigo-50 p-3 rounded-xl shadow-inner resize-none outline-none h-56" />
                    </div>
                    <button className='bg-indigo-600 rounded-xl shadow-xl text-white p-3 mt-3 font-semibold'>Guardar</button>
                </form>
            </div>
        </div>
    );
};
