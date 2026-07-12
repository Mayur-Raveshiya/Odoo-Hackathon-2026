'use client';

import { useState } from 'react';
import { DriverSummaryCards } from '@/components/features/drivers/driver-summary-cards';
import { DriverFilters } from '@/components/features/drivers/driver-filters';
import { DriverTable, type Driver } from '@/components/features/drivers/driver-table';
import { DriverDetailsDrawer } from '@/components/features/drivers/driver-details-drawer';
import { DriverForm } from '@/components/features/drivers/driver-form';
import { DriverDeleteAlert } from '@/components/features/drivers/driver-delete-alert';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const mockDrivers: Driver[] = [
  {
    id: 'd1',
    fullName: 'Jane Doe',
    contactNumber: '+1 555-0192',
    email: 'jane@transitops.com',
    licenseNumber: 'DL-98765432',
    licenseCategory: 'Class A',
    licenseExpiryDate: '2028-12-31',
    safetyScore: 98,
    status: 'Available',
    createdAt: '2024-05-12',
  },
  {
    id: 'd2',
    fullName: 'Michael Scott',
    contactNumber: '+1 555-2244',
    email: 'mscott@transitops.com',
    licenseNumber: 'DL-12345678',
    licenseCategory: 'Class B',
    licenseExpiryDate: '2025-01-01',
    safetyScore: 65,
    status: 'Suspended',
    createdAt: '2025-01-02',
  },
  {
    id: 'd3',
    fullName: 'Sarah Connor',
    contactNumber: '+1 555-9988',
    email: 'sconnor@transitops.com',
    licenseNumber: 'DL-55555555',
    licenseCategory: 'Class A',
    licenseExpiryDate: '2027-06-15',
    safetyScore: 100,
    status: 'On Trip',
    createdAt: '2025-02-28',
  },
  {
    id: 'd4',
    fullName: 'Dwight Schrute',
    contactNumber: '+1 555-4433',
    email: 'dschrute@transitops.com',
    licenseNumber: 'DL-33344455',
    licenseCategory: 'Class C',
    licenseExpiryDate: '2029-11-20',
    safetyScore: 88,
    status: 'Off Duty',
    createdAt: '2024-10-10',
  }
];

export default function DriversPage() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
          drivers={mockDrivers} 
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
      />

      <DriverDeleteAlert 
        open={isDeleteOpen} 
        onOpenChange={setIsDeleteOpen} 
        onConfirm={() => setIsDeleteOpen(false)} 
        driverName={selectedDriver?.fullName} 
      />
    </div>
  );
}
