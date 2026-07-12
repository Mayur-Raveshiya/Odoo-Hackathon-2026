/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { OperationsSummaryCards } from '@/components/features/operations/operations-summary-cards';
import { OperationsFilters } from '@/components/features/operations/operations-filters';
import { OperationsTable, type ColumnDef } from '@/components/features/operations/operations-table';
import { OperationsStatusBadge } from '@/components/features/operations/operations-status-badge';
import { Button } from '@/components/ui/button';
import { Wrench, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import type { MaintenanceJob } from '@/lib/services/maintenance.service';
import { getMaintenanceJobsAction, openJobAction, closeJobAction } from './actions';
import { getVehiclesAction } from '../vehicles/actions';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

export default function MaintenancePage() {
  const [jobs, setJobs] = useState<MaintenanceJob[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [j, v] = await Promise.all([getMaintenanceJobsAction(), getVehiclesAction()]);
    setJobs(j);
    setVehicles(v);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleOpenJob = async () => {
    // In a real app, we'd open a dialog to select vehicle and issue.
    // Assuming v1 exists for demonstration.
    if (vehicles.length === 0) return alert('No vehicles available.');
    const targetVehicle = vehicles[0];

    setLoading(true);
    const newJob: MaintenanceJob = {
      id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
      vehicleId: targetVehicle.id,
      issue: 'Routine Inspection',
      priority: 'Medium',
      status: 'Open',
      assignedDate: new Date().toISOString().split('T')[0]
    };
    
    const res = await openJobAction(newJob);
    
    if (res.success) {
      await fetchData();
    } else {
      setLoading(false);
      alert(res.error);
    }
  };

  const handleCloseJob = async (job: MaintenanceJob) => {
    setLoading(true);
    const res = await closeJobAction(job.id, job.vehicleId);
    
    if (res.success) {
      await fetchData();
    } else {
      setLoading(false);
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
