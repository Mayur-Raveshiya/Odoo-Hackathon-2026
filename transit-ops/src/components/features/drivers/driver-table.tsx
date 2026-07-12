import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DriverStatusBadge, type DriverStatus } from './driver-status-badge';
import { MoreHorizontal, Eye, Edit, Trash2, Users } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export interface Driver {
  id: string;
  fullName: string;
  contactNumber: string;
  email: string;
  licenseNumber: string;
  licenseCategory: string;
  licenseExpiryDate: string;
  safetyScore: number;
  status: DriverStatus;
  createdAt: string;
}

export function DriverTable({ 
  drivers, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  drivers: Driver[], 
  onView: (d: Driver) => void, 
  onEdit: (d: Driver) => void, 
  onDelete: (d: Driver) => void 
}) {
  return (
    <div className="rounded-md border bg-card/50 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent whitespace-nowrap">
              <TableHead>Driver Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>License No.</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Safety Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-[400px] text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Users className="h-10 w-10 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No drivers found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              drivers.map((driver) => (
                <TableRow key={driver.id} className="group transition-colors whitespace-nowrap">
                  <TableCell className="font-semibold">{driver.fullName}</TableCell>
                  <TableCell>{driver.contactNumber}</TableCell>
                  <TableCell className="text-muted-foreground">{driver.licenseNumber}</TableCell>
                  <TableCell>{driver.licenseCategory}</TableCell>
                  <TableCell className="text-muted-foreground">{driver.licenseExpiryDate}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${driver.safetyScore >= 90 ? 'text-emerald-500' : driver.safetyScore < 70 ? 'text-destructive' : 'text-amber-500'}`}>
                      {driver.safetyScore}/100
                    </span>
                  </TableCell>
                  <TableCell>
                    <DriverStatusBadge status={driver.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground md:opacity-0 group-hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => onView(driver)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(driver)} className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Driver
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(driver)} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
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
