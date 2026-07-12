import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { DriverStatusBadge } from './driver-status-badge';
import { Separator } from '@/components/ui/separator';
import type { Driver } from './driver-table';

export function DriverDetailsDrawer({ driver, open, onOpenChange }: { driver: Driver | null, open: boolean, onOpenChange: (open: boolean) => void }) {
  if (!driver) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto border-l shadow-2xl">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-bold tracking-tight">{driver.fullName}</SheetTitle>
            <DriverStatusBadge status={driver.status} />
          </div>
          <SheetDescription className="text-base">{driver.licenseNumber}</SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Driver Profile</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Contact</span>
                <p className="font-medium">{driver.contactNumber}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Email</span>
                <p className="font-medium">{driver.email}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">License Category</span>
                <p className="font-medium">{driver.licenseCategory}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">License Expiry</span>
                <p className="font-medium">{driver.licenseExpiryDate}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Safety Score</span>
                <p className="font-medium">{driver.safetyScore}/100</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground text-xs uppercase tracking-wider font-medium">Added</span>
                <p className="font-medium">{driver.createdAt}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Assigned Trips</h3>
            <div className="p-4 bg-muted/40 rounded-lg border border-border/50 text-center text-sm text-muted-foreground">
              Trips integration pending.
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg tracking-tight mb-4">Safety Incidents</h3>
            <div className="p-4 bg-muted/40 rounded-lg border border-border/50 text-center text-sm text-muted-foreground">
              Safety history integration pending.
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
