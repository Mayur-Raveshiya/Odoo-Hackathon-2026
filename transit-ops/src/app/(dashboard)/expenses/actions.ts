'use server';

import { ExpenseService, type Expense } from '@/lib/services/expense.service';

export async function recordExpenseAction(expense: Expense) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = await ExpenseService.recordExpense(expense);
    return { success: true, data: result };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to record expense.' };
  }
}

export async function approveExpenseAction(expense: Expense) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = await ExpenseService.approveExpense(expense);
    return { success: true, data: result };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to approve expense.' };
  }
}
