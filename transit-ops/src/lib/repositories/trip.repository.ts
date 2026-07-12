import { mockDb } from '../db';
import type { Trip } from '@/components/features/trips/trip-table';

export class TripRepository {
  static async findAll(): Promise<Trip[]> {
    return [...mockDb.trips];
  }

  static async findById(id: string): Promise<Trip | undefined> {
    return mockDb.trips.find(t => t.id === id);
  }

  static async create(trip: Trip): Promise<Trip> {
    mockDb.trips.push(trip);
    return trip;
  }

  static async update(id: string, data: Partial<Trip>): Promise<Trip> {
    const index = mockDb.trips.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Trip not found');
    mockDb.trips[index] = { ...mockDb.trips[index], ...data };
    return mockDb.trips[index];
  }

  static async delete(id: string): Promise<void> {
    mockDb.trips = mockDb.trips.filter(t => t.id !== id);
  }
}
