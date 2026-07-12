import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Driver } from './driver-table';

export function DriverForm({ open, onOpenChange, driver, onSave }: { open: boolean, onOpenChange: (open: boolean) => void, driver?: Driver | null, onSave?: (data: Partial<Driver>) => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (onSave) {
      onSave({
        fullName: formData.get('name') as string,
        contactNumber: formData.get('contact') as string,
        email: formData.get('email') as string,
        licenseNumber: formData.get('license') as string,
        licenseCategory: formData.get('category') as string,
        licenseExpiryDate: formData.get('expiry') as string,
        safetyScore: Number(formData.get('safety')) || 100,
      });
    } else {
      onOpenChange(false);
    }
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
                <Input id="name" name="name" required defaultValue={driver?.fullName} placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" name="contact" required defaultValue={driver?.contactNumber} placeholder="+1 555-0000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" required type="email" defaultValue={driver?.email} placeholder="jane@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">License Number</Label>
                <Input id="license" name="license" required defaultValue={driver?.licenseNumber} placeholder="DL-000000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">License Category</Label>
                <Input id="category" name="category" required defaultValue={driver?.licenseCategory} placeholder="Class A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" name="expiry" required type="date" defaultValue={driver?.licenseExpiryDate} />
              </div>
            </div>
            {driver && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="safety">Safety Score (0-100)</Label>
                <Input id="safety" name="safety" required type="number" min="0" max="100" defaultValue={driver?.safetyScore ?? 100} />
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
