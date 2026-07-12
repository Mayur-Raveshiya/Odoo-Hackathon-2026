import { mockDb } from '../db';
import type { FuelLog } from '../services/fuel.service';

export class FuelRepository {
  static async findAll(): Promise<FuelLog[]> {
    return [...mockDb.fuelLogs];
  }

  static async create(log: FuelLog): Promise<FuelLog> {
    mockDb.fuelLogs.push(log);
    return log;
  }
}
