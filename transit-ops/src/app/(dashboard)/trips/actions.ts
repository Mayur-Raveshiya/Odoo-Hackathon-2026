'use server';

import { TripService } from '@/lib/services/trip.service';
import type { Trip } from '@/components/features/trips/trip-table';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';
import type { Driver } from '@/components/features/drivers/driver-table';

export async function dispatchTripAction(trip: Trip, vehicle: Vehicle, driver: Driver) {
  try {
    // Simulate network delay for UX realism
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // In a real scenario, this would fetch the latest Vehicle and Driver from Supabase by ID.
    // For now, we run the service logic against the passed state.
    const result = await TripService.dispatchTrip(trip, vehicle, driver);
    
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to dispatch trip.';
    return { success: false, error: message };
  }
}

export async function completeTripAction(trip: Trip, vehicle: Vehicle, driver: Driver, finalOdometer: number) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = await TripService.completeTrip(trip, vehicle, driver, finalOdometer);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to complete trip.';
    return { success: false, error: message };
  }
}

export async function cancelTripAction(trip: Trip, vehicle?: Vehicle, driver?: Driver) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const result = await TripService.cancelTrip(trip, vehicle, driver);
    return { success: true, data: result };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to cancel trip.';
    return { success: false, error: message };
  }
}
