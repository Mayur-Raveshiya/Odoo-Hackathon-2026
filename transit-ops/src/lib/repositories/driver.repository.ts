import { mockDb } from '../db';
import type { Driver } from '@/components/features/drivers/driver-table';

export class DriverRepository {
  static async findAll(): Promise<Driver[]> {
    return [...mockDb.drivers];
  }

  static async findById(id: string): Promise<Driver | undefined> {
    return mockDb.drivers.find(d => d.id === id);
  }

  static async create(driver: Driver): Promise<Driver> {
    mockDb.drivers.push(driver);
    return driver;
  }

  static async update(id: string, data: Partial<Driver>): Promise<Driver> {
    const index = mockDb.drivers.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Driver not found');
    mockDb.drivers[index] = { ...mockDb.drivers[index], ...data };
    return mockDb.drivers[index];
  }

  static async delete(id: string): Promise<void> {
    mockDb.drivers = mockDb.drivers.filter(d => d.id !== id);
  }
}
