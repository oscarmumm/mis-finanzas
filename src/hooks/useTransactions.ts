import { useEffect, useState } from 'react';
import type { Transaction } from '../types';
import { isSameMonth, parseISO } from 'date-fns';
import { initialTransactions } from '../db/sampleData.ts';

export const useTransactions = () => {
    const [transactions, setTransactions] =
        useState<Transaction[]>(initialTransactions);

    useEffect(() => {
        const stored = localStorage.getItem('transactions');
        if (stored) {
            setTransactions(JSON.parse(stored));
        } else {
            localStorage.setItem(
                'transactions',
                JSON.stringify(initialTransactions)
            );
        }
    }, []);

    const saveToStorage = (data: Transaction[]) => {
        localStorage.setItem('transactions', JSON.stringify(data));
        setTransactions(data);
    };

    const addTransaction = (tx: Transaction) => {
        const updated = [...transactions, tx];
        saveToStorage(updated);
    };

    const deleteTransaction = (id: number) => {
        const updated = transactions.filter((tx) => tx.transactionId !== id);
        saveToStorage(updated);
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

    return {
        transactions,
        addTransaction,
        deleteTransaction,
        getMonthlyExpensesAmount,
        getMonthlyIncomesAmount,
        getMonthlyExpenseTransactions,
        getMonthlyIncomeTransactions,
        getLatestTransactions,
    };
};
