import { VehicleService } from './vehicle.service';
import { DriverService } from './driver.service';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';
import type { Driver } from '@/components/features/drivers/driver-table';
import type { Trip } from '@/components/features/trips/trip-table';

export class TripService {
  /**
   * Orchestrates the dispatch of a trip.
   * Runs business rules against the Trip, Vehicle, and Driver.
   */
  static async dispatchTrip(trip: Trip, vehicle: Vehicle, driver: Driver) {
    // 1. Validate Vehicle Business Rules
    VehicleService.validateForDispatch(vehicle, trip.cargoWeight);
    
    // 2. Validate Driver Business Rules
    DriverService.validateForDispatch(driver);

    // 3. Ensure Trip is in Draft state
    if (trip.status !== 'Draft') {
      throw new Error('Only Draft trips can be dispatched.');
    }

    // 4. Perform state mutations (simulating DB transaction)
    const updatedVehicle = VehicleService.markAsDispatched(vehicle);
    const updatedDriver = DriverService.markAsDispatched(driver);
    const updatedTrip: Trip = { ...trip, status: 'Dispatched' };

    return { trip: updatedTrip, vehicle: updatedVehicle, driver: updatedDriver };
  }

  /**
   * Orchestrates the completion of a trip.
   */
  static async completeTrip(trip: Trip, vehicle: Vehicle, driver: Driver, finalOdometer: number) {
    if (trip.status !== 'Dispatched') {
      throw new Error('Only Dispatched trips can be completed.');
    }

    const updatedVehicle = VehicleService.markAsAvailable(vehicle, finalOdometer);
    const updatedDriver = DriverService.markAsAvailable(driver);
    const updatedTrip: Trip = { ...trip, status: 'Completed' };

    return { trip: updatedTrip, vehicle: updatedVehicle, driver: updatedDriver };
  }

  /**
   * Orchestrates the cancellation of a trip.
   */
  static async cancelTrip(trip: Trip, vehicle?: Vehicle, driver?: Driver) {
    if (trip.status === 'Completed') {
      throw new Error('Completed trips cannot be cancelled.');
    }

    const updatedVehicle = vehicle ? VehicleService.markAsAvailable(vehicle) : undefined;
    const updatedDriver = driver ? DriverService.markAsAvailable(driver) : undefined;
    const updatedTrip: Trip = { ...trip, status: 'Cancelled' };

    return { trip: updatedTrip, vehicle: updatedVehicle, driver: updatedDriver };
  }
}
