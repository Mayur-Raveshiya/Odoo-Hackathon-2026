'use server';

import { FuelService, type FuelLog } from '@/lib/services/fuel.service';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

export async function recordFuelAction(log: FuelLog, vehicle: Vehicle) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = await FuelService.recordFuel(log, vehicle);
    return { success: true, data: result };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to record fuel.' };
  }
}
