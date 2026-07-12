import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type TripStatus = 'Draft' | 'Dispatched' | 'Completed' | 'Cancelled';

export function TripStatusBadge({ status }: { status: TripStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium transition-colors',
        status === 'Draft' && 'bg-muted text-muted-foreground border-border',
        status === 'Dispatched' && 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
        status === 'Completed' && 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
        status === 'Cancelled' && 'bg-destructive/10 text-destructive border-destructive/20'
      )}
    >
      {status}
    </Badge>
  );
}
