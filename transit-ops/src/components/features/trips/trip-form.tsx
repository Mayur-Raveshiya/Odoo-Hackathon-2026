import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Trip } from './trip-table';

export function TripForm({ 
  open, 
  onOpenChange, 
  trip,
  onSave
}: { 
  open: boolean, 
  onOpenChange: (open: boolean) => void, 
  trip?: Trip | null,
  onSave: (data: Partial<Trip>) => void
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSave({
      source: formData.get('source') as string,
      destination: formData.get('destination') as string,
      cargoWeight: Number(formData.get('cargoWeight')),
      plannedDistance: Number(formData.get('plannedDistance')),
      vehicleId: formData.get('vehicleId') as string,
      driverId: formData.get('driverId') as string,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl tracking-tight">{trip ? 'Edit Trip' : 'Create Draft Trip'}</DialogTitle>
            <DialogDescription>
              {trip ? 'Update the details for this draft trip.' : 'Create a new trip in Draft state. You can dispatch it later.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source Location</Label>
                <Input id="source" name="source" required defaultValue={trip?.source} placeholder="New York, NY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" name="destination" required defaultValue={trip?.destination} placeholder="Los Angeles, CA" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicleId">Assigned Vehicle</Label>
                <Select name="vehicleId" defaultValue={trip?.vehicleId || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="v1">Volvo FH16 (TRK-0001)</SelectItem>
                    <SelectItem value="v2">Scania R500 (TRK-0002)</SelectItem>
                    <SelectItem value="v3">Mercedes Actros (TRK-0003)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="driverId">Assigned Driver</Label>
                <Select name="driverId" defaultValue={trip?.driverId || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="d1">Jane Doe</SelectItem>
                    <SelectItem value="d2">Michael Scott</SelectItem>
                    <SelectItem value="d3">Sarah Connor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cargoWeight">Cargo Weight (kg)</Label>
                <Input id="cargoWeight" name="cargoWeight" type="number" min="0" required defaultValue={trip?.cargoWeight} placeholder="25000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plannedDistance">Planned Distance (km)</Label>
                <Input id="plannedDistance" name="plannedDistance" type="number" min="0" required defaultValue={trip?.plannedDistance} placeholder="4500" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{trip ? 'Save Changes' : 'Create Trip'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
