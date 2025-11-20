import { useEffect, useState } from 'react';
import { formatMoney } from '../utils';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { GiMoneyStack } from "react-icons/gi";
import { format, parseISO } from 'date-fns';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useAppData } from '../hooks/useAppData';

export const Home = () => {
    const {
        getMonthlyExpensesAmount,
        getMonthlyIncomesAmount,
        getLatestTransactions,
        getMonthlyExpenseTransactions,
        getMonthlyIncomeTransactions,
        categories
    } = useAppData();
    useEffect(() => {
        calculateExpensesCategoriesParticipation();
        calculateIncomesCategoriesParticipation();
    }, []);
    const [sensitiveInfoVisible, setSensitiveInfoVisible] =
        useState<boolean>(true);
    const [
        expensesCategoriesParticipationData,
        setExpensesCategoriesParticipationData,
    ] = useState<{ name: string; amount: number }[]>([]);
    const [
        incomesCategoriesParticipationData,
        setIncomesCategoriesParticipationData,
    ] = useState<{ name: string; amount: number }[]>([]);

    const calculateExpensesCategoriesParticipation = () => {
        const participation: { name: string; amount: number }[] = [];
        getMonthlyExpenseTransactions().forEach((tx) => {
            const category = categories.find(
                (cat) => cat.categoryId === tx.categoryId
            );
            if (!category) return;
            const exisiting = participation.find(
                (entry) => entry.name === category.name
            );
            if (exisiting) {
                exisiting.amount += tx.amount;
            } else {
                participation.push({ name: category.name, amount: tx.amount });
            }
        });
        setExpensesCategoriesParticipationData(participation);
    };

    const calculateIncomesCategoriesParticipation = () => {
        const participation: { name: string; amount: number }[] = [];
        getMonthlyIncomeTransactions().forEach((tx) => {
            const category = categories.find(
                (cat) => cat.categoryId === tx.categoryId
            );
            if (!category) return;
            const exisiting = participation.find(
                (entry) => entry.name === category.name
            );
            if (exisiting) {
                exisiting.amount += tx.amount;
            } else {
                participation.push({ name: category.name, amount: tx.amount });
            }
        });
        setIncomesCategoriesParticipationData(participation);
    };

    return (
        <div className="p-3 text-indigo-900">
            <div className="flex items-center justify-center p-5 mb-5">
                <h1 className="text-3xl font-semibold">Mis Finanzas</h1>
                <GiMoneyStack className="text-4xl ml-5" />
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-xl/20 mb-5">
                <div className="flex justify-between mb-3">
                    <span className="font-semibold text-2xl">Balance</span>
                    <button
                        className="text-3xl text-indigo-700 self-end"
                        onClick={() => {
                            setSensitiveInfoVisible(!sensitiveInfoVisible);
                        }}>
                        {sensitiveInfoVisible ? <IoMdEye /> : <IoMdEyeOff />}
                    </button>
                </div>
                <div className="mb-5">
                    <p className="flex flex-col">
                        <span>Mes actual: </span>
                        <span className="text-4xl font-semibold">
                            {sensitiveInfoVisible
                                ? formatMoney(
                                      getMonthlyIncomesAmount() -
                                          getMonthlyExpensesAmount()
                                  )
                                : '$ * * * * *'}
                        </span>
                    </p>
                </div>
                <div className="flex justify-between">
                    <p className="flex flex-col">
                        <span>Ingresos </span>
                        <span className="font-semibold">
                            {sensitiveInfoVisible
                                ? formatMoney(getMonthlyIncomesAmount())
                                : '$ * * * * *'}
                        </span>
                    </p>
                    <p className="flex flex-col">
                        <span>Gastos </span>
                        <span className="font-semibold">
                            {sensitiveInfoVisible
                                ? formatMoney(getMonthlyExpensesAmount())
                                : '$ * * * * *'}
                        </span>
                    </p>
                </div>
            </div>
            <div className="bg-white pt-5 pb-3 rounded-3xl shadow-xl/20 mb-5 flex flex-col">
                <span className="px-5 mb-3 font-semibold text-2xl">
                    Últimas transacciones
                </span>
                <table className="rounded-xl overflow-hidden text-center">
                    <thead>
                        <tr>
                            <th className="p-1">Tipo</th>
                            <th className="p-1">Monto</th>
                            <th className="p-1">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getLatestTransactions(5).map((tx) => (
                            <tr
                                key={tx.transactionId}
                                className="border-t border-indigo-200">
                                <td className="p-1">
                                    {tx.type === 'income' ? 'Ingreso' : 'Gasto'}
                                </td>
                                <td className="p-1">
                                    {formatMoney(tx.amount)}
                                </td>
                                <td className="p-1">
                                    {format(parseISO(tx.date), 'dd-MM-yyyy')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-xl/20 mb-5 w-full h-auto min-h-[300px]">
                <span className="mb-3 font-semibold text-2xl">
                    Ingresos por categoría
                </span>
                {incomesCategoriesParticipationData && (
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={incomesCategoriesParticipationData}
                                dataKey="amount"
                                nameKey="name"
                                outerRadius={80}
                                label={({ name }) => `${name}`}
                                fill="#6a4fdc"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
                <ul>
                    {incomesCategoriesParticipationData.map((el) => (
                        <li key={el.name} className='flex justify-between border-b border-indigo-300'>
                            <span className="font-semibold">{el.name} </span>
                            <span>{formatMoney(el.amount)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-5 rounded-3xl shadow-xl/20 mb-20 w-full h-auto min-h-[300px]">
                <span className="mb-3 font-semibold text-2xl">
                    Gastos por categoría
                </span>
                {expensesCategoriesParticipationData && (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={expensesCategoriesParticipationData}
                                dataKey="amount"
                                nameKey="name"
                                outerRadius={80}
                                label={({ name }) => `${name}`}
                                fill="#6a4fdc"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
                <ul>
                    {expensesCategoriesParticipationData.map((el) => (
                        <li key={el.name} className='flex justify-between border-b border-indigo-300'>
                            <span className="font-semibold">{el.name} </span>
                            <span>{formatMoney(el.amount)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
