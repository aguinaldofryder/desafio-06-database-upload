import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions: Transaction[] = await this.find();

    const income = this.reduceValueTransactionIncome(transactions);
    const outcome = this.reduceValueTransactionOutcome(transactions);
    const total = income - outcome;

    const balance: Balance = { income, outcome, total };
    return balance;
  }

  private reduceValueTransactionIncome(transactions: Transaction[]): number {
    const total = transactions
      .filter(this.checkTransactionTypeIsIncome)
      .reduce(this.agregateValueTransaction, 0);

    return total;
  }

  private reduceValueTransactionOutcome(transactions: Transaction[]): number {
    const total = transactions
      .filter(this.checkTransactionTypeIsOutcome)
      .reduce(this.agregateValueTransaction, 0);

    return total;
  }

  private checkTransactionTypeIsIncome(transaction: Transaction): boolean {
    return transaction.type === 'income';
  }

  private checkTransactionTypeIsOutcome(transaction: Transaction): boolean {
    return transaction.type === 'outcome';
  }

  private agregateValueTransaction(
    total: number,
    transaction: Transaction,
  ): number {
    return total + Number(transaction.value);
  }
}

export default TransactionsRepository;
