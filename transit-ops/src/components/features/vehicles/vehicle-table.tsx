import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VehicleStatusBadge, type VehicleStatus } from './vehicle-status-badge';
import { MoreHorizontal, Eye, Edit, Trash2, Truck } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export interface Vehicle {
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

export function VehicleTable({ 
  vehicles, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  vehicles: Vehicle[], 
  onView: (v: Vehicle) => void, 
  onEdit: (v: Vehicle) => void, 
  onDelete: (v: Vehicle) => void 
}) {
  return (
    <div className="rounded-md border bg-card/50 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent whitespace-nowrap">
              <TableHead>Registration</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Max Load</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Odometer</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-[400px] text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Truck className="h-10 w-10 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No vehicles found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="group transition-colors whitespace-nowrap">
                  <TableCell className="font-semibold">{vehicle.registrationNumber}</TableCell>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.type}</TableCell>
                  <TableCell>{vehicle.maxLoad.toLocaleString()} kg</TableCell>
                  <TableCell>
                    <VehicleStatusBadge status={vehicle.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.odometer.toLocaleString()} km</TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground md:opacity-0 group-hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => onView(vehicle)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(vehicle)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Vehicle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(vehicle)} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
