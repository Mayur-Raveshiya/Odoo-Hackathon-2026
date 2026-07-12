import { mockDb } from '../db';
import type { Expense } from '../services/expense.service';

export class ExpenseRepository {
  static async findAll(): Promise<Expense[]> {
    return [...mockDb.expenses];
  }

  static async create(expense: Expense): Promise<Expense> {
    mockDb.expenses.push(expense);
    return expense;
  }

  static async update(id: string, data: Partial<Expense>): Promise<Expense> {
    const index = mockDb.expenses.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Expense not found');
    mockDb.expenses[index] = { ...mockDb.expenses[index], ...data };
    return mockDb.expenses[index];
  }
}
