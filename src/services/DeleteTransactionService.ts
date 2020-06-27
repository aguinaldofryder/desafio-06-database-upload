// import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public async execute(id: string): Promise<void> {
    await this.transactionsRepository.delete(id);
  }
}

export default DeleteTransactionService;
