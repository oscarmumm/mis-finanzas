import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Category, Transaction } from '../types';
import { isSameMonth, parseISO } from 'date-fns';
import { initialCategories, initialTransactions } from '../db/sampleData';

type AppDataContextType = {
    categories: Category[];
    transactions: Transaction[];
    addCategory: (cat: Category) => void;
    deleteCategory: (id: number) => void;
    addTransaction: (tx: Transaction) => void;
    deleteTransaction: (id: number) => void;
    getMonthlyExpensesAmount: () => number;
    getMonthlyExpenseTransactions: () => Transaction[];
    getMonthlyIncomesAmount: () => number;
    getMonthlyIncomeTransactions: () => Transaction[];
    getLatestTransactions: (count: number) => Transaction[];
};

export const AppDataContext = createContext<AppDataContextType | null>(null);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [transactions, setTransactions] =
        useState<Transaction[]>(initialTransactions);

    useEffect(() => {
        const storedCategories = localStorage.getItem('categories');
        const storedTransactions = localStorage.getItem('transactions');

        if (storedCategories) setCategories(JSON.parse(storedCategories));
        if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
    }, []);

    const saveCategories = (categories: Category[]) => {
        localStorage.setItem('categories', JSON.stringify(categories));
        setCategories(categories);
    };

    const saveTransactions = (transactions: Transaction[]) => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
        setTransactions(transactions);
    };

    const addCategory = (cat: Category) => {
        const updated = [...categories, cat];
        saveCategories(updated);
    };

    const deleteCategory = (id: number) => {
        const updated = categories.filter((cat) => cat.categoryId !== id);
        saveCategories(updated);
    };

    const addTransaction = (tx: Transaction) => {
        const updated = [...transactions, tx];
        saveTransactions(updated);
    };

    const deleteTransaction = (id: number) => {
        const updated = transactions.filter((tx) => tx.transactionId !== id);
        saveTransactions(updated);
    };

    const getMonthlyExpensesAmount = (): number => {
        const now = new Date();
        return transactions
            .filter(
                (tx) =>
                    tx.type === 'expense' && isSameMonth(parseISO(tx.date), now)
            )
            .reduce((sum, tx) => sum + tx.amount, 0);
    };

    const getMonthlyExpenseTransactions = (): Transaction[] => {
        const now = new Date();
        return transactions.filter(
            (tx) => tx.type === 'expense' && isSameMonth(parseISO(tx.date), now)
        );
    };

    const getMonthlyIncomesAmount = (): number => {
        const now = new Date();
        return transactions
            .filter(
                (tx) =>
                    tx.type === 'income' && isSameMonth(parseISO(tx.date), now)
            )
            .reduce((sum, tx) => sum + tx.amount, 0);
    };

    const getMonthlyIncomeTransactions = (): Transaction[] => {
        const now = new Date();
        return transactions.filter(
            (tx) => tx.type === 'income' && isSameMonth(parseISO(tx.date), now)
        );
    };

    const getLatestTransactions = (count: number = 5) => {
        return [...transactions]
            .sort(
                (a, b) =>
                    parseISO(b.date).getTime() - parseISO(a.date).getTime()
            )
            .slice(0, count);
    };

    return (
        <AppDataContext.Provider
            value={{
                categories,
                transactions,
                addCategory,
                addTransaction,
                deleteCategory,
                deleteTransaction,
                getMonthlyExpensesAmount,
                getMonthlyExpenseTransactions,
                getMonthlyIncomesAmount,
                getMonthlyIncomeTransactions,
                getLatestTransactions,
            }}>
            {children}
        </AppDataContext.Provider>
    );
};
