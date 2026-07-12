import { VehicleService } from './vehicle.service';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

export interface MaintenanceJob {
  id: string;
  vehicleId: string;
  issue: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Closed';
  assignedDate: string;
  completedDate?: string;
}

export class MaintenanceService {
  /**
   * Orchestrates opening a maintenance job.
   */
  static async openJob(job: MaintenanceJob, vehicle: Vehicle) {
    if (vehicle.status === 'Retired') {
      throw new Error('Cannot perform maintenance on a retired vehicle.');
    }
    
    // Set vehicle status to In Shop
    const updatedVehicle = { ...vehicle, status: 'In Shop' as const };
    const updatedJob: MaintenanceJob = { ...job, status: 'Open' };

    return { job: updatedJob, vehicle: updatedVehicle };
  }

  /**
   * Orchestrates closing a maintenance job.
   */
  static async closeJob(job: MaintenanceJob, vehicle: Vehicle) {
    if (job.status === 'Closed') {
      throw new Error('Job is already closed.');
    }

    // Vehicle becomes Available unless it was manually retired while in the shop
    let updatedVehicle = vehicle;
    if (vehicle.status !== 'Retired') {
      updatedVehicle = VehicleService.markAsAvailable(vehicle);
    }
    
    const updatedJob: MaintenanceJob = { 
      ...job, 
      status: 'Closed', 
      completedDate: new Date().toISOString().split('T')[0] 
    };

    return { job: updatedJob, vehicle: updatedVehicle };
  }
}
