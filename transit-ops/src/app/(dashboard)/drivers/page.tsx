/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { DriverSummaryCards } from '@/components/features/drivers/driver-summary-cards';
import { DriverFilters } from '@/components/features/drivers/driver-filters';
import { DriverTable, type Driver } from '@/components/features/drivers/driver-table';
import { DriverDetailsDrawer } from '@/components/features/drivers/driver-details-drawer';
import { DriverForm } from '@/components/features/drivers/driver-form';
import { DriverDeleteAlert } from '@/components/features/drivers/driver-delete-alert';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { getDriversAction, createDriverAction, updateDriverAction, deleteDriverAction } from './actions';

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const fetchDrivers = async () => {
    const data = await getDriversAction();
    setDrivers(data);
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleSaveForm = async (data: Partial<Driver>) => {
    if (selectedDriver) {
      await updateDriverAction(selectedDriver.id, data);
    } else {
      await createDriverAction({
        ...data,
        id: `d${Date.now()}`,
        status: 'Available',
        createdAt: new Date().toISOString().split('T')[0]
      } as Driver);
    }
    setIsFormOpen(false);
    fetchDrivers();
  };

  const handleConfirmDelete = async () => {
    if (selectedDriver) {
      await deleteDriverAction(selectedDriver.id);
      setIsDeleteOpen(false);
      fetchDrivers();
    }
  };

  const handleView = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDrawerOpen(true);
  };

  const handleEdit = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsFormOpen(true);
  };

  const handleDelete = (driver: Driver) => {
    setSelectedDriver(driver);
    setIsDeleteOpen(true);
  };

  const handleCreate = () => {
    setSelectedDriver(null);
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Driver Registry</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your fleet personnel and compliance.</p>
        </div>
        <Button onClick={handleCreate} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Driver
        </Button>
      </div>

      <DriverSummaryCards />
      
      <div className="mt-4">
        <DriverFilters />
        <DriverTable 
          drivers={drivers} 
          onView={handleView} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </div>

      <DriverDetailsDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
        driver={selectedDriver} 
      />
      
      <DriverForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        driver={selectedDriver}
        onSave={handleSaveForm}
      />

      <DriverDeleteAlert 
        open={isDeleteOpen} 
        onOpenChange={setIsDeleteOpen} 
        onConfirm={handleConfirmDelete} 
        driverName={selectedDriver?.fullName} 
      />
    </div>
  );
}
