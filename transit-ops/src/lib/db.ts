import type { Vehicle } from '@/components/features/vehicles/vehicle-table';
import type { Driver } from '@/components/features/drivers/driver-table';
import type { Trip } from '@/components/features/trips/trip-table';
import type { MaintenanceJob } from '@/lib/services/maintenance.service';
import type { FuelLog } from '@/lib/services/fuel.service';
import type { Expense } from '@/lib/services/expense.service';

interface DBState {
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  maintenanceJobs: MaintenanceJob[];
  fuelLogs: FuelLog[];
  expenses: Expense[];
}

// Initial mock data
const initialState: DBState = {
  vehicles: [
    { id: 'v1', registrationNumber: 'TRK-9901', name: 'Alpha Hauler', type: 'Heavy Truck', manufacturer: 'Volvo', model: 'FH16', maxLoad: 25000, status: 'Available', odometer: 150000, acquisitionCost: 145000, createdAt: '2025-01-10' },
    { id: 'v2', registrationNumber: 'TRK-9902', name: 'Beta Cruiser', type: 'Heavy Truck', manufacturer: 'Scania', model: 'R500', maxLoad: 22000, status: 'Available', odometer: 85000, acquisitionCost: 130000, createdAt: '2025-02-15' },
    { id: 'v3', registrationNumber: 'VAN-5001', name: 'City Sprinter', type: 'Van', manufacturer: 'Mercedes', model: 'Sprinter', maxLoad: 3500, status: 'Available', odometer: 45000, acquisitionCost: 55000, createdAt: '2025-03-20' },
  ],
  drivers: [
    { id: 'd1', fullName: 'John Doe', contactNumber: '+1 555-0101', email: 'john@transitops.com', licenseNumber: 'DL-90812', licenseCategory: 'Heavy Commercial (CDL-A)', licenseExpiryDate: '2028-10-15', safetyScore: 98, status: 'Available', createdAt: '2023-01-15' },
    { id: 'd2', fullName: 'Jane Smith', contactNumber: '+1 555-0102', email: 'jane@transitops.com', licenseNumber: 'DL-34211', licenseCategory: 'Light Commercial (CDL-B)', licenseExpiryDate: '2026-05-20', safetyScore: 92, status: 'Available', createdAt: '2024-03-10' },
  ],
  trips: [],
  maintenanceJobs: [],
  fuelLogs: [],
  expenses: [],
};

const globalForDb = globalThis as unknown as {
  __mockDb: DBState | undefined;
};

export const mockDb = globalForDb.__mockDb ?? { ...initialState };

if (process.env.NODE_ENV !== 'production') globalForDb.__mockDb = mockDb;
