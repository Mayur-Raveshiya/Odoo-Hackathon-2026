import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Vehicle } from './vehicle-table';

export function VehicleForm({ open, onOpenChange, vehicle }: { open: boolean, onOpenChange: (open: boolean) => void, vehicle?: Vehicle | null }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl tracking-tight">{vehicle ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
            <DialogDescription>
              {vehicle ? 'Update vehicle details below.' : 'Enter details for the new vehicle in the fleet.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reg">Registration No.</Label>
                <Input id="reg" required defaultValue={vehicle?.registrationNumber} placeholder="TRK-0000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Vehicle Name</Label>
                <Input id="name" required defaultValue={vehicle?.name} placeholder="Alpha Hauler" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">Manufacturer</Label>
                <Input id="make" required defaultValue={vehicle?.manufacturer} placeholder="Volvo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" required defaultValue={vehicle?.model} placeholder="FH16" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Vehicle Type</Label>
                <Input id="type" required defaultValue={vehicle?.type} placeholder="Heavy Truck" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="load">Max Load (kg)</Label>
                <Input id="load" required type="number" min="0" defaultValue={vehicle?.maxLoad} placeholder="25000" />
              </div>
            </div>
            {vehicle && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="odometer">Odometer (km)</Label>
                  <Input id="odometer" required type="number" min="0" defaultValue={vehicle?.odometer} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Acquisition Cost ($)</Label>
                  <Input id="cost" required type="number" min="0" defaultValue={vehicle?.acquisitionCost} />
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{vehicle ? 'Save Changes' : 'Create Vehicle'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
