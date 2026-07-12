import { mockDb } from '../db';
import type { MaintenanceJob } from '../services/maintenance.service';

export class MaintenanceRepository {
  static async findAll(): Promise<MaintenanceJob[]> {
    return [...mockDb.maintenanceJobs];
  }

  static async create(job: MaintenanceJob): Promise<MaintenanceJob> {
    mockDb.maintenanceJobs.push(job);
    return job;
  }

  static async update(id: string, data: Partial<MaintenanceJob>): Promise<MaintenanceJob> {
    const index = mockDb.maintenanceJobs.findIndex(j => j.id === id);
    if (index === -1) throw new Error('Maintenance Job not found');
    mockDb.maintenanceJobs[index] = { ...mockDb.maintenanceJobs[index], ...data };
    return mockDb.maintenanceJobs[index];
  }
}
