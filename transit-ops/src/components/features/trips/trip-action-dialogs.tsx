import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function TripDispatchDialog({ open, onOpenChange, onConfirm, tripId, loading }: { open: boolean, onOpenChange: (open: boolean) => void, onConfirm: () => void, tripId?: string, loading?: boolean }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Dispatch Trip {tripId}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will formally dispatch the trip. The vehicle and driver statuses will be set to &apos;On Trip&apos; and business rules will be enforced.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => { e.preventDefault(); onConfirm(); }} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
            {loading ? 'Dispatching...' : 'Dispatch'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function TripCompleteDialog({ open, onOpenChange, onConfirm, tripId, loading }: { open: boolean, onOpenChange: (open: boolean) => void, onConfirm: (odometer: number, fuel: number) => void, tripId?: string, loading?: boolean }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onConfirm(Number(formData.get('odometer')), Number(formData.get('fuel')));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Complete Trip {tripId}</DialogTitle>
            <DialogDescription>
              Enter final trip metrics to complete this trip. Driver and Vehicle statuses will be restored to &apos;Available&apos;.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="odometer">Final Odometer (km)</Label>
              <Input id="odometer" name="odometer" type="number" required min="0" placeholder="125000" disabled={loading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fuel">Fuel Used (Liters)</Label>
              <Input id="fuel" name="fuel" type="number" required min="0" placeholder="1200" disabled={loading} />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              {loading ? 'Completing...' : 'Complete Trip'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function TripCancelDialog({ open, onOpenChange, onConfirm, tripId, loading }: { open: boolean, onOpenChange: (open: boolean) => void, onConfirm: () => void, tripId?: string, loading?: boolean }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Trip {tripId}?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel this trip? Driver and Vehicle statuses will be freed if they were dispatched.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Close</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => { e.preventDefault(); onConfirm(); }} disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white transition-colors">
            {loading ? 'Cancelling...' : 'Cancel Trip'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
