import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type VehicleStatus = 'Available' | 'On Trip' | 'In Shop' | 'Retired';

export function VehicleStatusBadge({ status }: { status: VehicleStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium transition-colors',
        status === 'Available' && 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
        status === 'On Trip' && 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
        status === 'In Shop' && 'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400',
        status === 'Retired' && 'bg-muted text-muted-foreground border-border'
      )}
    >
      {status}
    </Badge>
  );
}
