'use client';

import { useState } from 'react';
import { VehicleSummaryCards } from '@/components/features/vehicles/vehicle-summary-cards';
import { VehicleFilters } from '@/components/features/vehicles/vehicle-filters';
import { VehicleTable, type Vehicle } from '@/components/features/vehicles/vehicle-table';
import { VehicleDetailsDrawer } from '@/components/features/vehicles/vehicle-details-drawer';
import { VehicleForm } from '@/components/features/vehicles/vehicle-form';
import { VehicleDeleteAlert } from '@/components/features/vehicles/vehicle-delete-alert';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    registrationNumber: 'TRK-9901',
    name: 'Alpha Hauler',
    type: 'Heavy Truck',
    manufacturer: 'Volvo',
    model: 'FH16',
    maxLoad: 25000,
    status: 'Available',
    odometer: 150000,
    acquisitionCost: 145000,
    createdAt: '2025-01-10',
  },
  {
    id: 'v2',
    registrationNumber: 'TRK-9902',
    name: 'Beta Cruiser',
    type: 'Heavy Truck',
    manufacturer: 'Scania',
    model: 'R500',
    maxLoad: 22000,
    status: 'On Trip',
    odometer: 85000,
    acquisitionCost: 130000,
    createdAt: '2025-02-15',
  },
  {
    id: 'v3',
    registrationNumber: 'VAN-5001',
    name: 'City Sprinter',
    type: 'Van',
    manufacturer: 'Mercedes',
    model: 'Sprinter',
    maxLoad: 3500,
    status: 'In Shop',
    odometer: 45000,
    acquisitionCost: 55000,
    createdAt: '2025-03-20',
  },
  {
    id: 'v4',
    registrationNumber: 'TRK-9903',
    name: 'Gamma Transporter',
    type: 'Heavy Truck',
    manufacturer: 'MAN',
    model: 'TGX',
    maxLoad: 24000,
    status: 'Retired',
    odometer: 320000,
    acquisitionCost: 120000,
    createdAt: '2024-11-05',
  }
];

export default function VehiclesPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleView = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDrawerOpen(true);
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsFormOpen(true);
  };

  const handleDelete = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDeleteOpen(true);
  };

  const handleCreate = () => {
    setSelectedVehicle(null);
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vehicle Registry</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage and monitor your entire fleet.</p>
        </div>
        <Button onClick={handleCreate} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      <VehicleSummaryCards />
      
      <div className="mt-4">
        <VehicleFilters />
        <VehicleTable 
          vehicles={mockVehicles} 
          onView={handleView} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>

      <VehicleDetailsDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        vehicle={selectedVehicle} 
      />
      
      <VehicleForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        vehicle={selectedVehicle} 
      />

      <VehicleDeleteAlert 
        open={isDeleteOpen} 
        onOpenChange={setIsDeleteOpen} 
        onConfirm={() => setIsDeleteOpen(false)} 
        vehicleName={selectedVehicle?.name} 
      />
    </div>
  );
}
