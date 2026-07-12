'use server';

import { MaintenanceService, type MaintenanceJob } from '@/lib/services/maintenance.service';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

export async function openJobAction(job: MaintenanceJob, vehicle: Vehicle) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = await MaintenanceService.openJob(job, vehicle);
    return { success: true, data: result };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to open job.' };
  }
}

export async function closeJobAction(job: MaintenanceJob, vehicle: Vehicle) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = await MaintenanceService.closeJob(job, vehicle);
    return { success: true, data: result };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to close job.' };
  }
}
