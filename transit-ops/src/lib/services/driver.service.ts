import type { Driver } from '@/components/features/drivers/driver-table';

export class DriverService {
  /**
   * Validates if a driver can be dispatched.
   * Throws an error if validation fails.
   */
  static validateForDispatch(driver: Driver) {
    if (driver.status === 'Suspended') {
      throw new Error('Cannot dispatch a suspended driver.');
    }
    if (driver.status === 'On Trip') {
      throw new Error('Driver is already on a trip.');
    }
    
    // Check if license is expired
    const expiryDate = new Date(driver.licenseExpiryDate);
    const today = new Date();
    if (expiryDate < today) {
      throw new Error('Driver license is expired.');
    }
  }

  /**
   * Sets driver status to On Trip
   */
  static markAsDispatched(driver: Driver): Driver {
    return { ...driver, status: 'On Trip' };
  }

  /**
   * Sets driver status to Available
   */
  static markAsAvailable(driver: Driver): Driver {
    return { ...driver, status: 'Available' };
  }
}
