'use server';

import { VehicleRepository } from '@/lib/repositories/vehicle.repository';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

export async function getVehiclesAction() {
  return await VehicleRepository.findAll();
}

export async function createVehicleAction(vehicle: Vehicle) {
  try {
    const created = await VehicleRepository.create(vehicle);
    return { success: true, data: created };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateVehicleAction(id: string, data: Partial<Vehicle>) {
  try {
    const updated = await VehicleRepository.update(id, data);
    return { success: true, data: updated };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteVehicleAction(id: string) {
  try {
    await VehicleRepository.delete(id);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
