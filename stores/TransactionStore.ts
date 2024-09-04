import { makeAutoObservable } from "mobx";

export interface Transaction {
  id: number;
  amount: number;
}

export class TransactionStore {
  transactions: Transaction[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTransaction(amount: number) {
    const newTransaction: Transaction = {
      id: Date.now(),
      amount,
    };
    this.transactions.push(newTransaction);
  }

  clearTransactions() {
    this.transactions = [];
  }
}

export const transactionStore = new TransactionStore();
