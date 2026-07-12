'use server';

import { DriverRepository } from '@/lib/repositories/driver.repository';
import type { Driver } from '@/components/features/drivers/driver-table';

export async function getDriversAction() {
  return await DriverRepository.findAll();
}

export async function createDriverAction(driver: Driver) {
  try {
    const created = await DriverRepository.create(driver);
    return { success: true, data: created };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateDriverAction(id: string, data: Partial<Driver>) {
  try {
    const updated = await DriverRepository.update(id, data);
    return { success: true, data: updated };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteDriverAction(id: string) {
  try {
    await DriverRepository.delete(id);
    return { success: true };
  } catch (error: unknown) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
