import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TripStatusBadge, type TripStatus } from './trip-status-badge';
import { MoreHorizontal, Eye, Edit, Trash2, Send, CheckCircle, XCircle, Route } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export interface Trip {
  id: string;
  source: string;
  destination: string;
  vehicleId: string;
  driverId: string;
  cargoWeight: number;
  plannedDistance: number;
  status: TripStatus;
  createdAt: string;
}

export function TripTable({ 
  trips, 
  onView, 
  onEdit, 
  onDispatch,
  onComplete,
  onCancel,
  onDelete 
}: { 
  trips: Trip[], 
  onView: (t: Trip) => void, 
  onEdit: (t: Trip) => void, 
  onDispatch: (t: Trip) => void,
  onComplete: (t: Trip) => void,
  onCancel: (t: Trip) => void,
  onDelete: (t: Trip) => void 
}) {
  return (
    <div className="rounded-md border bg-card/50 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent whitespace-nowrap">
              <TableHead>Trip ID</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Cargo (kg)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-[400px] text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Route className="h-10 w-10 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No trips found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              trips.map((trip) => (
                <TableRow key={trip.id} className="group transition-colors whitespace-nowrap">
                  <TableCell className="font-semibold text-xs text-muted-foreground">{trip.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium text-sm">{trip.source}</span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Route className="h-3 w-3 mr-1" /> {trip.destination}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{trip.vehicleId}</TableCell>
                  <TableCell className="text-muted-foreground">{trip.driverId}</TableCell>
                  <TableCell>{trip.cargoWeight.toLocaleString()}</TableCell>
                  <TableCell>
                    <TripStatusBadge status={trip.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">{trip.createdAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground md:opacity-0 group-hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px]">
                        <DropdownMenuItem onClick={() => onView(trip)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        
                        {trip.status === 'Draft' && (
                          <>
                            <DropdownMenuItem onClick={() => onEdit(trip)} className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Trip
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onDispatch(trip)} className="cursor-pointer text-blue-600 focus:text-blue-600 focus:bg-blue-500/10">
                              <Send className="mr-2 h-4 w-4" />
                              Dispatch Trip
                            </DropdownMenuItem>
                          </>
                        )}
                        
                        {trip.status === 'Dispatched' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onComplete(trip)} className="cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-500/10">
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Complete Trip
                            </DropdownMenuItem>
                          </>
                        )}

                        {trip.status !== 'Completed' && trip.status !== 'Cancelled' && (
                          <DropdownMenuItem onClick={() => onCancel(trip)} className="cursor-pointer text-amber-600 focus:text-amber-600 focus:bg-amber-500/10">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Trip
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onDelete(trip)} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Trip
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
