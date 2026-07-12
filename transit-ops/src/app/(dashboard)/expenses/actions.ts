'use server';

import { ExpenseRepository } from '@/lib/repositories/expense.repository';
import { ExpenseService, type Expense } from '@/lib/services/expense.service';

export async function getExpensesAction() {
  return await ExpenseRepository.findAll();
}

export async function recordExpenseAction(expense: Expense) {
  try {
    const result = await ExpenseService.recordExpense(expense);
    await ExpenseRepository.create(result.expense);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function approveExpenseAction(expenseId: string) {
  try {
    const expenses = await ExpenseRepository.findAll();
    const expense = expenses.find(e => e.id === expenseId);
    if (!expense) throw new Error('Expense not found.');

    const result = await ExpenseService.approveExpense(expense);
    await ExpenseRepository.update(result.expense.id, result.expense);
    
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
