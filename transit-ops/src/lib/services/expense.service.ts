export interface Expense {
  id: string;
  type: 'Operational' | 'Maintenance' | 'Administrative';
  vehicleId?: string;
  tripId?: string;
  amount: number;
  date: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Paid';
}

export class ExpenseService {
  /**
   * Validates and records a new expense.
   */
  static async recordExpense(expense: Expense) {
    if (expense.amount <= 0) {
      throw new Error('Expense amount must be greater than zero.');
    }
    
    // In a real system, this might validate the tripId against the TripService
    // or vehicleId against the VehicleService to ensure they exist and are valid targets.
    
    return { expense };
  }

  /**
   * Approves an expense.
   */
  static async approveExpense(expense: Expense) {
    if (expense.status !== 'Pending') {
      throw new Error('Only pending expenses can be approved.');
    }
    return { expense: { ...expense, status: 'Approved' as const } };
  }

  /**
   * Pays an expense.
   */
  static async payExpense(expense: Expense) {
    if (expense.status !== 'Approved') {
      throw new Error('Only approved expenses can be paid.');
    }
    return { expense: { ...expense, status: 'Paid' as const } };
  }
}
