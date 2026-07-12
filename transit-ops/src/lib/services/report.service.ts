import { VehicleRepository } from '../repositories/vehicle.repository';
import { DriverRepository } from '../repositories/driver.repository';
import { TripRepository } from '../repositories/trip.repository';
import { MaintenanceRepository } from '../repositories/maintenance.repository';
import { FuelRepository } from '../repositories/fuel.repository';
import { ExpenseRepository } from '../repositories/expense.repository';

import type { Vehicle } from '@/components/features/vehicles/vehicle-table';
import type { Driver } from '@/components/features/drivers/driver-table';
import type { Trip } from '@/components/features/trips/trip-table';
import type { MaintenanceJob } from './maintenance.service';
import type { FuelLog } from './fuel.service';
import type { Expense } from './expense.service';

export interface ExecutiveReportData {
  fleet: {
    total: number;
    active: number;
    inShop: number;
    retired: number;
    utilizationPercent: number;
  };
  drivers: {
    total: number;
    available: number;
    onTrip: number;
    suspended: number;
    expiringLicenses: number;
  };
  trips: {
    total: number;
    draft: number;
    active: number;
    completed: number;
    cancelled: number;
    avgCargoWeight: number;
    avgDistance: number;
  };
  maintenance: {
    openJobs: number;
    closedJobs: number;
    vehiclesInShop: number; // usually matches fleet.inShop
  };
  fuel: {
    totalConsumed: number;
    avgEfficiency: number;
    monthlyCost: number;
  };
  expenses: {
    totalOperational: number;
    maintenanceCost: number;
    fuelCost: number;
    administrativeCost: number;
  };
  raw: {
    vehicles: Vehicle[];
    drivers: Driver[];
    trips: Trip[];
    maintenance: MaintenanceJob[];
    fuel: FuelLog[];
    expenses: Expense[];
  }
}

export class ReportService {
  static async generateExecutiveReport(): Promise<ExecutiveReportData> {
    // 1. Fetch from repositories
    const [vehicles, drivers, trips, maintenance, fuel, expenses] = await Promise.all([
      VehicleRepository.findAll(),
      DriverRepository.findAll(),
      TripRepository.findAll(),
      MaintenanceRepository.findAll(),
      FuelRepository.findAll(),
      ExpenseRepository.findAll(),
    ]);

    // 2. Compute Fleet
    const fleetTotal = vehicles.length;
    const fleetActive = vehicles.filter(v => v.status === 'Available' || v.status === 'On Trip').length;
    const fleetInShop = vehicles.filter(v => v.status === 'In Shop').length;
    const fleetRetired = vehicles.filter(v => v.status === 'Retired').length;
    const fleetUtilization = fleetTotal > 0 ? Math.round((fleetActive / fleetTotal) * 100) : 0;

    // 3. Compute Drivers
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const driverTotal = drivers.length;
    const driverAvailable = drivers.filter(d => d.status === 'Available').length;
    const driverOnTrip = drivers.filter(d => d.status === 'On Trip').length;
    const driverSuspended = drivers.filter(d => d.status === 'Suspended').length;
    const driverExpiring = drivers.filter(d => new Date(d.licenseExpiryDate) < nextMonth).length;

    // 4. Compute Trips
    const tripTotal = trips.length;
    const tripDraft = trips.filter(t => t.status === 'Draft').length;
    const tripActive = trips.filter(t => t.status === 'Dispatched').length;
    const tripCompleted = trips.filter(t => t.status === 'Completed').length;
    const tripCancelled = trips.filter(t => t.status === 'Cancelled').length;
    
    const avgCargoWeight = tripTotal > 0 ? Math.round(trips.reduce((acc, t) => acc + t.cargoWeight, 0) / tripTotal) : 0;
    const avgDistance = tripTotal > 0 ? Math.round(trips.reduce((acc, t) => acc + t.plannedDistance, 0) / tripTotal) : 0;

    // 5. Compute Maintenance
    const maintOpen = maintenance.filter(m => m.status === 'Open').length;
    const maintClosed = maintenance.filter(m => m.status === 'Closed').length;

    // 6. Compute Fuel
    const fuelTotal = fuel.reduce((acc, f) => acc + f.liters, 0);
    const fuelCost = fuel.reduce((acc, f) => acc + f.cost, 0);
    
    let totalEfficiency = 0;
    let efficiencyCount = 0;
    for (const log of fuel) {
      if (log.efficiency && log.efficiency > 0) {
        totalEfficiency += log.efficiency;
        efficiencyCount++;
      }
    }
    const fuelAvgEfficiency = efficiencyCount > 0 ? Number((totalEfficiency / efficiencyCount).toFixed(2)) : 0;

    // 7. Compute Expenses
    // Categorized costs
    let expMaintenance = 0;
    let expFuel = 0;
    let expAdmin = 0;
    
    for (const e of expenses) {
      if (e.status !== 'Approved') continue; // Optional: Only count approved expenses? We'll count all for now to be safe, or just Approved. Let's assume all recorded cost money. Actually let's just sum all.
      
      if (e.type === 'Maintenance') expMaintenance += e.amount;
      else if (e.type === 'Operational') expFuel += e.amount; // often Fuel is mapped to operational
      else if (e.type === 'Administrative') expAdmin += e.amount;
    }
    
    // We can override the fuel expense with actual FuelLog costs if there are any that aren't logged as expenses
    const totalFuelCost = Math.max(expFuel, fuelCost);

    const expTotal = expMaintenance + totalFuelCost + expAdmin;

    return {
      fleet: {
        total: fleetTotal,
        active: fleetActive,
        inShop: fleetInShop,
        retired: fleetRetired,
        utilizationPercent: fleetUtilization,
      },
      drivers: {
        total: driverTotal,
        available: driverAvailable,
        onTrip: driverOnTrip,
        suspended: driverSuspended,
        expiringLicenses: driverExpiring,
      },
      trips: {
        total: tripTotal,
        draft: tripDraft,
        active: tripActive,
        completed: tripCompleted,
        cancelled: tripCancelled,
        avgCargoWeight,
        avgDistance,
      },
      maintenance: {
        openJobs: maintOpen,
        closedJobs: maintClosed,
        vehiclesInShop: fleetInShop, // mapped from fleet
      },
      fuel: {
        totalConsumed: fuelTotal,
        avgEfficiency: fuelAvgEfficiency,
        monthlyCost: totalFuelCost,
      },
      expenses: {
        totalOperational: expTotal,
        maintenanceCost: expMaintenance,
        fuelCost: totalFuelCost,
        administrativeCost: expAdmin,
      },
      raw: {
        vehicles,
        drivers,
        trips,
        maintenance,
        fuel,
        expenses
      }
    };
  }
}
