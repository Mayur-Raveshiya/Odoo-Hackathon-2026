import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Driver } from './driver-table';

export function DriverForm({ open, onOpenChange, driver }: { open: boolean, onOpenChange: (open: boolean) => void, driver?: Driver | null }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl tracking-tight">{driver ? 'Edit Driver' : 'Add Driver'}</DialogTitle>
            <DialogDescription>
              {driver ? 'Update driver details below.' : 'Enter details for the new driver.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required defaultValue={driver?.fullName} placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" required defaultValue={driver?.contactNumber} placeholder="+1 555-0192" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required defaultValue={driver?.email} placeholder="jane@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <Input id="license" required defaultValue={driver?.licenseNumber} placeholder="DL-12345678" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">License Category</Label>
                <Input id="category" required defaultValue={driver?.licenseCategory} placeholder="Class A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">License Expiry Date</Label>
                <Input id="expiry" type="date" required defaultValue={driver?.licenseExpiryDate} />
              </div>
            </div>
            {driver && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="score">Safety Score (0-100)</Label>
                  <Input id="score" type="number" min="0" max="100" required defaultValue={driver?.safetyScore} />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{driver ? 'Save Changes' : 'Create Driver'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
