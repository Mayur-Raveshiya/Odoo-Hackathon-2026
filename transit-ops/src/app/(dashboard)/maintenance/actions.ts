'use server';

import { MaintenanceRepository } from '@/lib/repositories/maintenance.repository';
import { VehicleRepository } from '@/lib/repositories/vehicle.repository';
import { MaintenanceService, type MaintenanceJob } from '@/lib/services/maintenance.service';

export async function getMaintenanceJobsAction() {
  return await MaintenanceRepository.findAll();
}

export async function openJobAction(job: MaintenanceJob) {
  try {
    const vehicle = await VehicleRepository.findById(job.vehicleId);
    if (!vehicle) throw new Error('Vehicle not found.');

    const result = await MaintenanceService.openJob(job, vehicle);
    
    await MaintenanceRepository.create(result.job);
    await VehicleRepository.update(result.vehicle.id, result.vehicle);
    
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function closeJobAction(jobId: string, vehicleId: string) {
  try {
    const jobs = await MaintenanceRepository.findAll();
    const job = jobs.find(j => j.id === jobId);
    const vehicle = await VehicleRepository.findById(vehicleId);
    if (!job || !vehicle) throw new Error('Entity not found.');

    const result = await MaintenanceService.closeJob(job, vehicle);
    
    await MaintenanceRepository.update(result.job.id, result.job);
    await VehicleRepository.update(result.vehicle.id, result.vehicle);
    
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
