import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type DriverStatus = 'Available' | 'On Trip' | 'Off Duty' | 'Suspended';

export function DriverStatusBadge({ status }: { status: DriverStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium transition-colors',
        status === 'Available' && 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
        status === 'On Trip' && 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
        status === 'Off Duty' && 'bg-muted text-muted-foreground border-border',
        status === 'Suspended' && 'bg-destructive/10 text-destructive border-destructive/20'
      )}
    >
      {status}
    </Badge>
  );
}
