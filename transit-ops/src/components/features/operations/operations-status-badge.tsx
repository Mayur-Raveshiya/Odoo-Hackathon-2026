import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type OperationStatus = 
  // Maintenance
  | 'Open' | 'In Progress' | 'Closed'
  // Expenses
  | 'Pending' | 'Approved' | 'Paid'
  // General/Fallback
  | string;

export function OperationsStatusBadge({ status }: { status: OperationStatus }) {
  const getStyle = () => {
    switch (status) {
      // Neutral/Draft/Pending
      case 'Open':
      case 'Pending':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400';
      
      // Active/In-Progress
      case 'In Progress':
      case 'Approved':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400';
      
      // Completed/Closed/Paid
      case 'Closed':
      case 'Paid':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400';
        
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <Badge variant="outline" className={cn('font-medium transition-colors whitespace-nowrap', getStyle())}>
      {status}
    </Badge>
  );
}
