import { parseISO, format } from 'date-fns';
import { formatMoney } from '../utils';
import { useAppData } from '../hooks/useAppData';

export const Transactions = () => {
    const { transactions } = useAppData();

    return (
        <div className="p-3 text-indigo-900">
            <div className="bg-white pt-5 pb-3 mb-20 rounded-3xl shadow-xl/20">
                <span className="px-5 mb-3 font-semibold text-2xl">
                    Historial de transacciones
                </span>
                <table className="mt-5 rounded-xl overflow-hidden text-center w-full">
                    <thead>
                        <tr>
                            <th className="p-1">Tipo</th>
                            <th className="p-1">Monto</th>
                            <th className="p-1">Categoría</th>
                            <th className="p-1">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr
                                key={tx.transactionId}
                                className="border-t border-indigo-200">
                                <td className="p-2">
                                    {tx.type === 'income' ? 'ingreso' : 'gasto'}
                                </td>
                                <td className="p-2">
                                    {formatMoney(tx.amount)}
                                </td>
                                <td className="p-2">{tx.categoryId}</td>
                                <td className="p-2">
                                    {format(parseISO(tx.date), 'dd-MM-yyyy')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
