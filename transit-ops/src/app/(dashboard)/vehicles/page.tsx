/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { VehicleSummaryCards } from '@/components/features/vehicles/vehicle-summary-cards';
import { VehicleFilters } from '@/components/features/vehicles/vehicle-filters';
import { VehicleTable, type Vehicle } from '@/components/features/vehicles/vehicle-table';
import { VehicleDetailsDrawer } from '@/components/features/vehicles/vehicle-details-drawer';
import { VehicleForm } from '@/components/features/vehicles/vehicle-form';
import { VehicleDeleteAlert } from '@/components/features/vehicles/vehicle-delete-alert';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { getVehiclesAction, createVehicleAction, updateVehicleAction, deleteVehicleAction } from './actions';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const fetchVehicles = async () => {
    const data = await getVehiclesAction();
    setVehicles(data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSaveForm = async (data: Partial<Vehicle>) => {
    if (selectedVehicle) {
      await updateVehicleAction(selectedVehicle.id, data);
    } else {
      await createVehicleAction({
        ...data,
        id: `v${Date.now()}`,
        status: 'Available',
        createdAt: new Date().toISOString().split('T')[0]
      } as Vehicle);
    }
    setIsFormOpen(false);
    fetchVehicles();
  };

  const handleConfirmDelete = async () => {
    if (selectedVehicle) {
      await deleteVehicleAction(selectedVehicle.id);
      setIsDeleteOpen(false);
      fetchVehicles();
    }
  };

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
          vehicles={vehicles} 
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
        onSave={handleSaveForm}
      />

      <VehicleDeleteAlert 
        open={isDeleteOpen} 
        onOpenChange={setIsDeleteOpen} 
        onConfirm={handleConfirmDelete} 
        vehicleName={selectedVehicle?.name} 
      />
    </div>
  );
}
