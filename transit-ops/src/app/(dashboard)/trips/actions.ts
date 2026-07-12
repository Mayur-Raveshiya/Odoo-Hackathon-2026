'use server';

import { TripRepository } from '@/lib/repositories/trip.repository';
import { VehicleRepository } from '@/lib/repositories/vehicle.repository';
import { DriverRepository } from '@/lib/repositories/driver.repository';
import { TripService } from '@/lib/services/trip.service';
import type { Trip } from '@/components/features/trips/trip-table';

export async function getTripsAction() {
  return await TripRepository.findAll();
}

export async function createTripAction(trip: Trip) {
  try {
    const created = await TripRepository.create(trip);
    return { success: true, data: created };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateTripAction(id: string, data: Partial<Trip>) {
  try {
    const updated = await TripRepository.update(id, data);
    return { success: true, data: updated };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteTripAction(id: string) {
  try {
    await TripRepository.delete(id);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function dispatchTripAction(tripId: string, vehicleId: string, driverId: string) {
  try {
    const trip = await TripRepository.findById(tripId);
    const vehicle = await VehicleRepository.findById(vehicleId);
    const driver = await DriverRepository.findById(driverId);
    if (!trip || !vehicle || !driver) throw new Error('Entity not found.');

    const result = await TripService.dispatchTrip(trip, vehicle, driver);
    
    await TripRepository.update(result.trip.id, result.trip);
    await VehicleRepository.update(result.vehicle.id, result.vehicle);
    await DriverRepository.update(result.driver.id, result.driver);
    
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function completeTripAction(tripId: string, vehicleId: string, driverId: string, finalOdometer: number) {
  try {
    const trip = await TripRepository.findById(tripId);
    const vehicle = await VehicleRepository.findById(vehicleId);
    const driver = await DriverRepository.findById(driverId);
    if (!trip || !vehicle || !driver) throw new Error('Entity not found.');

    const result = await TripService.completeTrip(trip, vehicle, driver, finalOdometer);
    
    await TripRepository.update(result.trip.id, result.trip);
    await VehicleRepository.update(result.vehicle.id, result.vehicle);
    await DriverRepository.update(result.driver.id, result.driver);
    
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function cancelTripAction(tripId: string, vehicleId?: string, driverId?: string) {
  try {
    const trip = await TripRepository.findById(tripId);
    const vehicle = vehicleId ? await VehicleRepository.findById(vehicleId) : undefined;
    const driver = driverId ? await DriverRepository.findById(driverId) : undefined;
    if (!trip) throw new Error('Trip not found.');

    const result = await TripService.cancelTrip(trip, vehicle, driver);
    
    await TripRepository.update(result.trip.id, result.trip);
    if (result.vehicle) await VehicleRepository.update(result.vehicle.id, result.vehicle);
    if (result.driver) await DriverRepository.update(result.driver.id, result.driver);
    
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
