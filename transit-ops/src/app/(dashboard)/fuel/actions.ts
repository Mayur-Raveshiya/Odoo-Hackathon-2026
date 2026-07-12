'use server';

import { FuelRepository } from '@/lib/repositories/fuel.repository';
import { VehicleRepository } from '@/lib/repositories/vehicle.repository';
import { FuelService, type FuelLog } from '@/lib/services/fuel.service';

export async function getFuelLogsAction() {
  return await FuelRepository.findAll();
}

export async function recordFuelAction(log: FuelLog) {
  try {
    const vehicle = await VehicleRepository.findById(log.vehicleId);
    if (!vehicle) throw new Error('Vehicle not found.');

    const result = await FuelService.recordFuel(log, vehicle);
    
    await FuelRepository.create(result.log);
    await VehicleRepository.update(result.vehicle.id, result.vehicle);
    
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
