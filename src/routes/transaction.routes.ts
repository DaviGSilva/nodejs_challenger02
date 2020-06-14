import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (req, res) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return res.json({
      'transactions': transactions,
      'balance': balance,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (req, res) => {
  try {
    const { title, value, type } = req.body;

    const createTrans = new CreateTransactionService(
      transactionsRepository
    );

    const transaction = createTrans.execute({
      title, value, type
    });

    return res.status(201).json(transaction);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
