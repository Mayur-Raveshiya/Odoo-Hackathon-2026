import { mockDb } from '../db';
import type { Vehicle } from '@/components/features/vehicles/vehicle-table';

export class VehicleRepository {
  static async findAll(): Promise<Vehicle[]> {
    return [...mockDb.vehicles];
  }

  static async findById(id: string): Promise<Vehicle | undefined> {
    return mockDb.vehicles.find(v => v.id === id);
  }

  static async create(vehicle: Vehicle): Promise<Vehicle> {
    mockDb.vehicles.push(vehicle);
    return vehicle;
  }

  static async update(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    const index = mockDb.vehicles.findIndex(v => v.id === id);
    if (index === -1) throw new Error('Vehicle not found');
    mockDb.vehicles[index] = { ...mockDb.vehicles[index], ...data };
    return mockDb.vehicles[index];
  }

  static async delete(id: string): Promise<void> {
    mockDb.vehicles = mockDb.vehicles.filter(v => v.id !== id);
  }
}
