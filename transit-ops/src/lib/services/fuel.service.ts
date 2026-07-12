import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

export interface FuelLog {
  id: string;
  vehicleId: string;
  date: string;
  liters: number;
  cost: number;
  odometer: number;
  efficiency?: number; // km/L
}

export class FuelService {
  /**
   * Orchestrates recording a fuel log.
   */
  static async recordFuel(log: FuelLog, vehicle: Vehicle) {
    if (log.odometer < vehicle.odometer) {
      throw new Error('Fuel log odometer cannot be less than current vehicle odometer.');
    }
    if (log.liters <= 0 || log.cost <= 0) {
      throw new Error('Liters and cost must be greater than zero.');
    }

    // Calculate efficiency if this isn't the first log (simplified mock logic)
    const distanceCovered = log.odometer - vehicle.odometer;
    const efficiency = distanceCovered > 0 ? Number((distanceCovered / log.liters).toFixed(2)) : 0;

    const updatedLog: FuelLog = { ...log, efficiency };
    
    // The vehicle odometer gets implicitly updated in a real system, but for mock purposes we update the vehicle state.
    const updatedVehicle = { ...vehicle, odometer: log.odometer };

    return { log: updatedLog, vehicle: updatedVehicle };
  }
}
