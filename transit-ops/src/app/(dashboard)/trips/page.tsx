'use client';

import { useState } from 'react';
import { TripSummaryCards } from '@/components/features/trips/trip-summary-cards';
import { TripFilters } from '@/components/features/trips/trip-filters';
import { TripTable, type Trip } from '@/components/features/trips/trip-table';
import { TripDetailsDrawer } from '@/components/features/trips/trip-details-drawer';
import { TripForm } from '@/components/features/trips/trip-form';
import { TripDispatchDialog, TripCompleteDialog, TripCancelDialog } from '@/components/features/trips/trip-action-dialogs';
import { validateBasicTripForm } from '@/lib/trip-validation';
import { dispatchTripAction, completeTripAction, cancelTripAction } from './actions';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';
import type { Driver } from '@/components/features/drivers/driver-table';

// Mock DB states
const initialVehicles: Vehicle[] = [
  { id: 'v1', registrationNumber: 'TRK-0001', name: 'Volvo FH16', type: 'Heavy Truck', manufacturer: 'Volvo', model: 'FH16', maxLoad: 25000, status: 'Available', odometer: 120500, acquisitionCost: 150000, createdAt: '2024-01-10' },
  { id: 'v2', registrationNumber: 'TRK-0002', name: 'Scania R500', type: 'Heavy Truck', manufacturer: 'Scania', model: 'R500', maxLoad: 24000, status: 'In Shop', odometer: 215000, acquisitionCost: 140000, createdAt: '2023-08-22' },
  { id: 'v3', registrationNumber: 'TRK-0003', name: 'Mercedes Actros', type: 'Heavy Truck', manufacturer: 'Mercedes', model: 'Actros', maxLoad: 26000, status: 'Available', odometer: 85000, acquisitionCost: 160000, createdAt: '2024-03-05' },
];

const initialDrivers: Driver[] = [
  { id: 'd1', fullName: 'Jane Doe', contactNumber: '+1 555-0192', email: 'jane@transitops.com', licenseNumber: 'DL-98765432', licenseCategory: 'Class A', licenseExpiryDate: '2028-12-31', safetyScore: 98, status: 'Available', createdAt: '2024-05-12' },
  { id: 'd2', fullName: 'Michael Scott', contactNumber: '+1 555-2244', email: 'mscott@transitops.com', licenseNumber: 'DL-12345678', licenseCategory: 'Class B', licenseExpiryDate: '2025-01-01', safetyScore: 65, status: 'Suspended', createdAt: '2025-01-02' },
  { id: 'd3', fullName: 'Sarah Connor', contactNumber: '+1 555-9988', email: 'sconnor@transitops.com', licenseNumber: 'DL-55555555', licenseCategory: 'Class A', licenseExpiryDate: '2027-06-15', safetyScore: 100, status: 'Available', createdAt: '2025-02-28' },
];

const initialTrips: Trip[] = [
  { id: 'TRP-1001', source: 'New York, NY', destination: 'Boston, MA', vehicleId: 'v1', driverId: 'd1', cargoWeight: 15000, plannedDistance: 350, status: 'Draft', createdAt: '2025-06-10' },
  { id: 'TRP-1002', source: 'Chicago, IL', destination: 'Detroit, MI', vehicleId: 'v2', driverId: 'd2', cargoWeight: 28000, plannedDistance: 450, status: 'Draft', createdAt: '2025-06-12' }, // Intentional overload & suspended driver for testing
];

export default function TripsPage() {
  // State
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Dialog controls
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  // Helpers
  const getVehicle = (id: string) => vehicles.find(v => v.id === id)!;
  const getDriver = (id: string) => drivers.find(d => d.id === id)!;

  const updateEntities = (updatedTrip: Trip, updatedVehicle?: Vehicle, updatedDriver?: Driver) => {
    setTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
    if (updatedVehicle) setVehicles(prev => prev.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
    if (updatedDriver) setDrivers(prev => prev.map(d => d.id === updatedDriver.id ? updatedDriver : d));
  };

  // Actions
  const handleSaveForm = (data: Partial<Trip>) => {
    const error = validateBasicTripForm(data);
    if (error) {
      alert(`Validation Error: ${error}`);
      return;
    }

    if (selectedTrip) {
      setTrips(prev => prev.map(t => t.id === selectedTrip.id ? { ...t, ...data } as Trip : t));
    } else {
      const newTrip: Trip = {
        ...data as Trip,
        id: `TRP-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Draft',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTrips([newTrip, ...trips]);
    }
    setIsFormOpen(false);
  };

  const executeDispatch = async () => {
    if (!selectedTrip) return;
    setLoading(true);
    const res = await dispatchTripAction(selectedTrip, getVehicle(selectedTrip.vehicleId), getDriver(selectedTrip.driverId));
    setLoading(false);
    
    if (res.success && res.data) {
      updateEntities(res.data.trip, res.data.vehicle, res.data.driver);
      setIsDispatchOpen(false);
    } else {
      alert(`Dispatch Failed: ${res.error}`);
    }
  };

  const executeComplete = async (odometer: number, fuel: number) => {
    if (!selectedTrip) return;
    setLoading(true);
    console.log(`Fuel consumed: ${fuel} liters`); // Simulate fuel recording
    const res = await completeTripAction(selectedTrip, getVehicle(selectedTrip.vehicleId), getDriver(selectedTrip.driverId), odometer);
    setLoading(false);
    
    if (res.success && res.data) {
      updateEntities(res.data.trip, res.data.vehicle, res.data.driver);
      setIsCompleteOpen(false);
    } else {
      alert(`Completion Failed: ${res.error}`);
    }
  };

  const executeCancel = async () => {
    if (!selectedTrip) return;
    setLoading(true);
    // Find entities only if they were dispatched and need freeing
    const v = selectedTrip.status === 'Dispatched' ? getVehicle(selectedTrip.vehicleId) : undefined;
    const d = selectedTrip.status === 'Dispatched' ? getDriver(selectedTrip.driverId) : undefined;
    
    const res = await cancelTripAction(selectedTrip, v, d);
    setLoading(false);
    
    if (res.success && res.data) {
      updateEntities(res.data.trip, res.data.vehicle, res.data.driver);
      setIsCancelOpen(false);
    } else {
      alert(`Cancellation Failed: ${res.error}`);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trip Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">Orchestrate your operational dispatch lifecycle.</p>
        </div>
        <Button onClick={() => { setSelectedTrip(null); setIsFormOpen(true); }} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Draft Trip
        </Button>
      </div>

      <TripSummaryCards />
      
      <div className="mt-4">
        <TripFilters />
        <TripTable 
          trips={trips} 
          onView={(t) => { setSelectedTrip(t); setIsDrawerOpen(true); }} 
          onEdit={(t) => { setSelectedTrip(t); setIsFormOpen(true); }} 
          onDispatch={(t) => { setSelectedTrip(t); setIsDispatchOpen(true); }}
          onComplete={(t) => { setSelectedTrip(t); setIsCompleteOpen(true); }}
          onCancel={(t) => { setSelectedTrip(t); setIsCancelOpen(true); }}
          onDelete={(t) => { setTrips(trips.filter(x => x.id !== t.id)); }} 
        />
      </div>

      <TripDetailsDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} trip={selectedTrip} />
      
      <TripForm open={isFormOpen} onOpenChange={setIsFormOpen} trip={selectedTrip} onSave={handleSaveForm} />

      <TripDispatchDialog open={isDispatchOpen} onOpenChange={setIsDispatchOpen} onConfirm={executeDispatch} tripId={selectedTrip?.id} loading={loading} />
      
      <TripCompleteDialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen} onConfirm={executeComplete} tripId={selectedTrip?.id} loading={loading} />
      
      <TripCancelDialog open={isCancelOpen} onOpenChange={setIsCancelOpen} onConfirm={executeCancel} tripId={selectedTrip?.id} loading={loading} />
    </div>
  );
}
