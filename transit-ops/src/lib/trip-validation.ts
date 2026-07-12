import type { Trip } from '@/components/features/trips/trip-table';

export function validateBasicTripForm(data: Partial<Trip>): string | null {
  if (!data.source?.trim()) return 'Source location is required.';
  if (!data.destination?.trim()) return 'Destination is required.';
  if (!data.vehicleId) return 'A vehicle must be selected.';
  if (!data.driverId) return 'A driver must be assigned.';
  if (!data.cargoWeight || data.cargoWeight <= 0) return 'Cargo weight must be greater than 0.';
  if (!data.plannedDistance || data.plannedDistance <= 0) return 'Planned distance must be greater than 0.';
  
  // Note: Deep business rules (like checking cargo capacity against the specific vehicle)
  // should happen in the backend/services, not here. We only do basic UX checks.
  return null;
}
