// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import CategoriesRepository from '../repositories/CategoriesRepository';
import TransactionsRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  transactionsRepository: TransactionsRepository;

  categoriesRepository: CategoriesRepository;

  constructor(
    transactionsRepository: TransactionsRepository,
    categoriesRepository: CategoriesRepository,
  ) {
    this.transactionsRepository = transactionsRepository;
    this.categoriesRepository = categoriesRepository;
  }

  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const { total } = await this.transactionsRepository.getBalance();
    this.checkAmountLessThanBalance(type, value, total);

    const category_id = await this.getCategoryId(category);
    const transaction = await this.transactionsRepository.create({
      title,
      value,
      type,
      category_id,
    });
    await this.transactionsRepository.save(transaction);

    return transaction;
  }

  private async getCategoryId(title: string): Promise<string> {
    const category = await this.categoriesRepository.findByTitle(title);

    if (!category) {
      const newCategory = await this.categoriesRepository.create({ title });
      await this.categoriesRepository.save(newCategory);

      return newCategory.id;
    }
    return category.id;
  }

  private checkAmountLessThanBalance(
    type: string,
    value: number,
    total: number,
  ): void {
    if (type === 'outcome' && value > total) {
      throw new AppError(
        'The amount posted is greater than the amount avaliable in cash',
        400,
      );
    }
  }
}

export default CreateTransactionService;
