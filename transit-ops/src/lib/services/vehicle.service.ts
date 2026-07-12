import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

export class VehicleService {
  /**
   * Validates if a vehicle can be dispatched.
   * Throws an error if validation fails.
   */
  static validateForDispatch(vehicle: Vehicle, cargoWeight: number) {
    if (vehicle.status === 'Retired') {
      throw new Error('Cannot dispatch a retired vehicle.');
    }
    if (vehicle.status === 'In Shop') {
      throw new Error('Cannot dispatch a vehicle that is in the shop.');
    }
    if (vehicle.status === 'On Trip') {
      throw new Error('Vehicle is already on a trip.');
    }
    if (cargoWeight > vehicle.maxLoad) {
      throw new Error(`Cargo weight (${cargoWeight} kg) exceeds vehicle capacity (${vehicle.maxLoad} kg).`);
    }
  }

  /**
   * Sets vehicle status to On Trip
   */
  static markAsDispatched(vehicle: Vehicle): Vehicle {
    return { ...vehicle, status: 'On Trip' };
  }

  /**
   * Sets vehicle status to Available
   */
  static markAsAvailable(vehicle: Vehicle, finalOdometer?: number): Vehicle {
    return { 
      ...vehicle, 
      status: 'Available',
      odometer: finalOdometer !== undefined ? finalOdometer : vehicle.odometer
    };
  }
}
