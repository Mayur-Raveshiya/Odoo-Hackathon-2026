import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VehicleStatusBadge, VehicleStatus } from './vehicle-status-badge';
import { Separator } from '@/components/ui/separator';

export interface VehicleDetails {
  id: string;
  registrationNumber: string;
  name: string;
  type: string;
  manufacturer: string;
  model: string;
  maxLoad: number;
  status: VehicleStatus;
  odometer: number;
  acquisitionCost: number;
  createdAt: string;
}

export function VehicleDetailsDrawer({ vehicle, open, onOpenChange }: { vehicle: VehicleDetails | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  if (!vehicle) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l shadow-2xl">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold tracking-tight">{vehicle.name}</SheetTitle>
            <VehicleStatusBadge status={vehicle.status} />
          </div>
          <SheetDescription className="text-base">{vehicle.registrationNumber}</SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Type</span>
                <p className="font-medium">{vehicle.type}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Manufacturer</span>
                <p className="font-medium">{vehicle.manufacturer}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Model</span>
                <p className="font-medium">{vehicle.model}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Max Load</span>
                <p className="font-medium">{vehicle.maxLoad.toLocaleString()} kg</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Odometer</span>
                <p className="font-medium">{vehicle.odometer.toLocaleString()} km</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Acquisition Cost</span>
                <p className="font-medium">${vehicle.acquisitionCost.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Added</span>
                <p className="font-medium">{vehicle.createdAt}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Maintenance History</h3>
            <div className="p-4 bg-muted/40 rounded-lg border border-border/50 text-center text-sm text-muted-foreground">
              Maintenance module integration pending.
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Fuel History</h3>
            <div className="p-4 bg-muted/40 rounded-lg border border-border/50 text-center text-sm text-muted-foreground">
              Fuel module integration pending.
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Trip History</h3>
            <div className="p-4 bg-muted/40 rounded-lg border border-border/50 text-center text-sm text-muted-foreground">
              Trip module integration pending.
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
