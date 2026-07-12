import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { TripStatusBadge } from './trip-status-badge';
import { Separator } from '@/components/ui/separator';
import type { Trip } from './trip-table';

export function TripDetailsDrawer({ trip, open, onOpenChange }: { trip: Trip | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  if (!trip) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l shadow-2xl">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold tracking-tight">Trip {trip.id}</SheetTitle>
            <TripStatusBadge status={trip.status} />
          </div>
          <SheetDescription className="text-base">
            {trip.source} → {trip.destination}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Trip Details</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Driver</span>
                <p className="font-medium">{trip.driverId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Vehicle</span>
                <p className="font-medium">{trip.vehicleId}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Cargo Weight</span>
                <p className="font-medium">{trip.cargoWeight.toLocaleString()} kg</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Distance</span>
                <p className="font-medium">{trip.plannedDistance.toLocaleString()} km</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Created</span>
                <p className="font-medium">{trip.createdAt}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Operations</h3>
            <div className="p-4 bg-muted/40 rounded-lg border border-border/50 text-center text-sm text-muted-foreground">
              Fuel and Expense tracking integration pending.
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Timeline</h3>
            <div className="p-4 bg-muted/40 rounded-lg border border-border/50 text-center text-sm text-muted-foreground">
              Detailed event timeline placeholder.
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
