'use client';

import { useState } from 'react';
import { OperationsSummaryCards } from '@/components/features/operations/operations-summary-cards';
import { OperationsFilters } from '@/components/features/operations/operations-filters';
import { OperationsTable, type ColumnDef } from '@/components/features/operations/operations-table';
import { OperationsStatusBadge } from '@/components/features/operations/operations-status-badge';
import { Button } from '@/components/ui/button';
import { Wrench, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import type { MaintenanceJob } from '@/lib/services/maintenance.service';
import { openJobAction, closeJobAction } from './actions';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

// Mock Vehicles (In a real app, these are fetched from the DB)
const initialVehicles: Vehicle[] = [
  { id: 'v1', registrationNumber: 'TRK-0001', name: 'Volvo FH16', type: 'Heavy Truck', manufacturer: 'Volvo', model: 'FH16', maxLoad: 25000, status: 'Available', odometer: 120500, acquisitionCost: 150000, createdAt: '2024-01-10' },
  { id: 'v2', registrationNumber: 'TRK-0002', name: 'Scania R500', type: 'Heavy Truck', manufacturer: 'Scania', model: 'R500', maxLoad: 24000, status: 'In Shop', odometer: 215000, acquisitionCost: 140000, createdAt: '2023-08-22' },
];

const initialJobs: MaintenanceJob[] = [
  { id: 'JOB-001', vehicleId: 'v1', issue: 'Oil Change', priority: 'Low', status: 'Closed', assignedDate: '2025-05-10', completedDate: '2025-05-11' },
  { id: 'JOB-002', vehicleId: 'v2', issue: 'Engine knocking sound', priority: 'Critical', status: 'Open', assignedDate: '2025-06-15' },
];

export default function MaintenancePage() {
  const [jobs, setJobs] = useState<MaintenanceJob[]>(initialJobs);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [loading, setLoading] = useState(false);

  const getVehicle = (id: string) => vehicles.find(v => v.id === id)!;

  const handleOpenJob = async () => {
    setLoading(true);
    const newJob: MaintenanceJob = {
      id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
      vehicleId: 'v1', // hardcoded to v1 for this mock action
      issue: 'Routine Inspection',
      priority: 'Medium',
      status: 'Open',
      assignedDate: new Date().toISOString().split('T')[0]
    };
    
    const res = await openJobAction(newJob, getVehicle('v1'));
    setLoading(false);
    
    if (res.success && res.data) {
      setJobs([res.data.job, ...jobs]);
      setVehicles(prev => prev.map(v => v.id === res.data.vehicle.id ? res.data.vehicle : v));
    } else {
      alert(res.error);
    }
  };

  const handleCloseJob = async (job: MaintenanceJob) => {
    setLoading(true);
    const res = await closeJobAction(job, getVehicle(job.vehicleId));
    setLoading(false);
    
    if (res.success && res.data) {
      setJobs(prev => prev.map(j => j.id === res.data.job.id ? res.data.job : j));
      setVehicles(prev => prev.map(v => v.id === res.data.vehicle.id ? res.data.vehicle : v));
    } else {
      alert(res.error);
    }
  };

  const columns: ColumnDef<MaintenanceJob>[] = [
    { header: 'Job ID', cell: (job) => <span className="font-medium text-muted-foreground text-xs">{job.id}</span> },
    { header: 'Vehicle', cell: (job) => <span className="font-medium">{job.vehicleId}</span> },
    { header: 'Issue', cell: (job) => job.issue },
    { 
      header: 'Priority', 
      cell: (job) => (
        <span className={`text-xs px-2 py-1 rounded-full ${job.priority === 'Critical' ? 'bg-red-500/10 text-red-600' : 'bg-secondary text-secondary-foreground'}`}>
          {job.priority}
        </span>
      ) 
    },
    { header: 'Status', cell: (job) => <OperationsStatusBadge status={job.status} /> },
    { header: 'Date', cell: (job) => <span className="text-muted-foreground">{job.assignedDate}</span> },
    { 
      header: 'Actions', 
      cell: (job) => (
        job.status !== 'Closed' && (
          <Button variant="ghost" size="sm" onClick={() => handleCloseJob(job)} disabled={loading} className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-500/10">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Close Job
          </Button>
        )
      ) 
    }
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage fleet repairs and shop statuses.</p>
        </div>
        <Button onClick={handleOpenJob} disabled={loading} className="shadow-sm">
          <Wrench className="mr-2 h-4 w-4" /> Open Job
        </Button>
      </div>

      <OperationsSummaryCards metrics={[
        { title: 'Open Jobs', value: jobs.filter(j => j.status === 'Open').length, icon: AlertTriangle },
        { title: 'In Shop', value: vehicles.filter(v => v.status === 'In Shop').length, icon: Clock },
        { title: 'Closed Jobs', value: jobs.filter(j => j.status === 'Closed').length, icon: CheckCircle2 },
      ]} />
      
      <div className="mt-4">
        <OperationsFilters searchPlaceholder="Search Jobs, Vehicles..." filters={[
          { key: 'status', placeholder: 'Status', options: [{ value: 'Open', label: 'Open' }, { value: 'Closed', label: 'Closed' }] }
        ]} />
        
        <OperationsTable data={jobs} columns={columns} emptyMessage="No maintenance jobs found." />
      </div>
    </div>
  );
}
