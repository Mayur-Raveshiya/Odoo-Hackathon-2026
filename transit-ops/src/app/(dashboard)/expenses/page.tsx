'use client';

import { useState } from 'react';
import { OperationsSummaryCards } from '@/components/features/operations/operations-summary-cards';
import { OperationsFilters } from '@/components/features/operations/operations-filters';
import { OperationsTable, type ColumnDef } from '@/components/features/operations/operations-table';
import { OperationsStatusBadge } from '@/components/features/operations/operations-status-badge';
import { Button } from '@/components/ui/button';
import { DollarSign, CheckCircle2, TrendingDown, Plus, TrendingUp } from 'lucide-react';
import type { Expense } from '@/lib/services/expense.service';
import { recordExpenseAction, approveExpenseAction } from './actions';

const initialExpenses: Expense[] = [
  { id: 'EXP-001', type: 'Operational', vehicleId: 'v1', amount: 450, date: '2025-06-10', description: 'Fuel Refill', status: 'Approved' },
  { id: 'EXP-002', type: 'Maintenance', vehicleId: 'v2', amount: 1200, date: '2025-06-15', description: 'Engine Repair', status: 'Pending' },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [loading, setLoading] = useState(false);

  const handleRecordExpense = async () => {
    setLoading(true);
    const newExp: Expense = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      type: 'Administrative',
      amount: 250,
      date: new Date().toISOString().split('T')[0],
      description: 'Permit Renewal',
      status: 'Pending'
    };
    
    const res = await recordExpenseAction(newExp);
    setLoading(false);
    
    if (res.success && res.data) {
      setExpenses([res.data.expense, ...expenses]);
    } else {
      alert(res.error);
    }
  };

  const handleApprove = async (expense: Expense) => {
    setLoading(true);
    const res = await approveExpenseAction(expense);
    setLoading(false);
    
    if (res.success && res.data) {
      setExpenses(prev => prev.map(e => e.id === res.data!.expense.id ? res.data!.expense : e));
    } else {
      alert(res.error);
    }
  };

  const columns: ColumnDef<Expense>[] = [
    { header: 'Expense ID', cell: (exp) => <span className="font-medium text-muted-foreground text-xs">{exp.id}</span> },
    { header: 'Type', cell: (exp) => exp.type },
    { header: 'Target', cell: (exp) => <span className="text-muted-foreground">{exp.vehicleId || exp.tripId || 'N/A'}</span> },
    { header: 'Description', cell: (exp) => exp.description },
    { header: 'Amount', cell: (exp) => <span className="font-medium text-emerald-600">${exp.amount.toLocaleString()}</span> },
    { header: 'Status', cell: (exp) => <OperationsStatusBadge status={exp.status} /> },
    { header: 'Date', cell: (exp) => <span className="text-muted-foreground">{exp.date}</span> },
    { 
      header: 'Actions', 
      cell: (exp) => (
        exp.status === 'Pending' && (
          <Button variant="ghost" size="sm" onClick={() => handleApprove(exp)} disabled={loading} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
          </Button>
        )
      ) 
    }
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground mt-1 text-sm">Monitor all fleet expenditures.</p>
        </div>
        <Button onClick={handleRecordExpense} disabled={loading} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Record Expense
        </Button>
      </div>

      <OperationsSummaryCards metrics={[
        { title: 'Total Cost', value: '$45,200', icon: DollarSign },
        { title: 'Operational', value: '$32,100', icon: TrendingUp },
        { title: 'Maintenance', value: '$13,100', icon: TrendingDown },
      ]} />
      
      <div className="mt-4">
        <OperationsFilters searchPlaceholder="Search Expenses..." filters={[
          { key: 'type', placeholder: 'Type', options: [{ value: 'Operational', label: 'Operational' }, { value: 'Maintenance', label: 'Maintenance' }] }
        ]} />
        
        <OperationsTable data={expenses} columns={columns} emptyMessage="No expenses found." />
      </div>
    </div>
  );
}
