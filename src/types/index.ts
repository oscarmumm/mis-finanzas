export interface Category {
    categoryId: number;
    name: string;
    icon?: string;
    type: 'income' | 'expense';
}

export interface Transaction {
    transactionId: number;
    type: 'income' | 'expense';
    description: string;
    categoryId: number;
    amount: number;
    date: string;
}