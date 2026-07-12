'use client';

import { useState } from 'react';
import { OperationsSummaryCards } from '@/components/features/operations/operations-summary-cards';
import { OperationsFilters } from '@/components/features/operations/operations-filters';
import { OperationsTable, type ColumnDef } from '@/components/features/operations/operations-table';
import { Button } from '@/components/ui/button';
import { Fuel, DollarSign, TrendingUp, Plus } from 'lucide-react';
import type { FuelLog } from '@/lib/services/fuel.service';
import { recordFuelAction } from './actions';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

const initialVehicles: Vehicle[] = [
  { id: 'v1', registrationNumber: 'TRK-0001', name: 'Volvo FH16', type: 'Heavy Truck', manufacturer: 'Volvo', model: 'FH16', maxLoad: 25000, status: 'Available', odometer: 120500, acquisitionCost: 150000, createdAt: '2024-01-10' },
];

const initialLogs: FuelLog[] = [
  { id: 'FL-001', vehicleId: 'v1', date: '2025-06-12', liters: 150, cost: 450, odometer: 119000, efficiency: 0 },
];

export default function FuelPage() {
  const [logs, setLogs] = useState<FuelLog[]>(initialLogs);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [loading, setLoading] = useState(false);

  const getVehicle = (id: string) => vehicles.find(v => v.id === id)!;

  const handleRecordFuel = async () => {
    setLoading(true);
    const newLog: FuelLog = {
      id: `FL-${Math.floor(100 + Math.random() * 900)}`,
      vehicleId: 'v1',
      date: new Date().toISOString().split('T')[0],
      liters: 200,
      cost: 600,
      odometer: 120500
    };
    
    const res = await recordFuelAction(newLog, getVehicle('v1'));
    setLoading(false);
    
    if (res.success && res.data) {
      setLogs([res.data.log, ...logs]);
      setVehicles(prev => prev.map(v => v.id === res.data.vehicle.id ? res.data.vehicle : v));
    } else {
      alert(res.error);
    }
  };

  const columns: ColumnDef<FuelLog>[] = [
    { header: 'Log ID', cell: (log) => <span className="font-medium text-muted-foreground text-xs">{log.id}</span> },
    { header: 'Vehicle', cell: (log) => <span className="font-medium">{log.vehicleId}</span> },
    { header: 'Date', cell: (log) => <span className="text-muted-foreground">{log.date}</span> },
    { header: 'Liters', cell: (log) => `${log.liters.toLocaleString()} L` },
    { header: 'Cost', cell: (log) => <span className="font-medium text-emerald-600">${log.cost.toLocaleString()}</span> },
    { header: 'Odometer', cell: (log) => `${log.odometer.toLocaleString()} km` },
    { header: 'Efficiency', cell: (log) => log.efficiency ? `${log.efficiency} km/L` : '-' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fuel Logs</h1>
          <p className="text-muted-foreground mt-1 text-sm">Track fuel consumption and operational costs.</p>
        </div>
        <Button onClick={handleRecordFuel} disabled={loading} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Record Fuel
        </Button>
      </div>

      <OperationsSummaryCards metrics={[
        { title: 'Total Fuel', value: '8,450 L', icon: Fuel },
        { title: 'Monthly Cost', value: '$25,350', icon: DollarSign },
        { title: 'Avg Efficiency', value: '2.4 km/L', icon: TrendingUp },
      ]} />
      
      <div className="mt-4">
        <OperationsFilters searchPlaceholder="Search Logs, Vehicles..." />
        <OperationsTable data={logs} columns={columns} emptyMessage="No fuel logs found." />
      </div>
    </div>
  );
}
