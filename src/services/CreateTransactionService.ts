import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Omit<Transaction, 'id'>): Transaction {
    if (!['income', 'outcome'].includes(type)) throw Error('Invalid transaction type');

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) throw Error('Outcome value exceeds total value');

    const transaction = this.transactionsRepository.create({
      title, value, type
    });

    return transaction;
  }
}

export default CreateTransactionService;
