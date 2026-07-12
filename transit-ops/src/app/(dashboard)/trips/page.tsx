/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { TripSummaryCards } from '@/components/features/trips/trip-summary-cards';
import { TripFilters } from '@/components/features/trips/trip-filters';
import { TripTable, type Trip } from '@/components/features/trips/trip-table';
import { TripDetailsDrawer } from '@/components/features/trips/trip-details-drawer';
import { TripForm } from '@/components/features/trips/trip-form';
import { TripDispatchDialog, TripCompleteDialog, TripCancelDialog } from '@/components/features/trips/trip-action-dialogs';
import { validateBasicTripForm } from '@/lib/trip-validation';
import { getTripsAction, createTripAction, updateTripAction, deleteTripAction, dispatchTripAction, completeTripAction, cancelTripAction } from './actions';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDispatchOpen, setIsDispatchOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const t = await getTripsAction();
    setTrips(t);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Actions
  const handleSaveForm = async (data: Partial<Trip>) => {
    const error = validateBasicTripForm(data);
    if (error) {
      alert(`Validation Error: ${error}`);
      return;
    }

    if (selectedTrip) {
      await updateTripAction(selectedTrip.id, data);
    } else {
      await createTripAction({
        ...data as Trip,
        id: `TRP-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Draft',
        createdAt: new Date().toISOString().split('T')[0]
      });
    }
    setIsFormOpen(false);
    fetchData();
  };

  const executeDispatch = async () => {
    if (!selectedTrip) return;
    setLoading(true);
    const res = await dispatchTripAction(selectedTrip.id, selectedTrip.vehicleId, selectedTrip.driverId);
    
    if (res.success) {
      await fetchData();
      setIsDispatchOpen(false);
    } else {
      setLoading(false);
      alert(`Dispatch Failed: ${res.error}`);
    }
  };

  const executeComplete = async (odometer: number) => {
    if (!selectedTrip) return;
    setLoading(true);
    const res = await completeTripAction(selectedTrip.id, selectedTrip.vehicleId, selectedTrip.driverId, odometer);
    
    if (res.success) {
      await fetchData();
      setIsCompleteOpen(false);
    } else {
      setLoading(false);
      alert(`Completion Failed: ${res.error}`);
    }
  };

  const executeCancel = async () => {
    if (!selectedTrip) return;
    setLoading(true);
    
    const res = await cancelTripAction(selectedTrip.id, selectedTrip.status === 'Dispatched' ? selectedTrip.vehicleId : undefined, selectedTrip.status === 'Dispatched' ? selectedTrip.driverId : undefined);
    
    if (res.success) {
      await fetchData();
      setIsCancelOpen(false);
    } else {
      setLoading(false);
      alert(`Cancellation Failed: ${res.error}`);
    }
  };

  const handleDelete = async (trip: Trip) => {
    await deleteTripAction(trip.id);
    fetchData();
  };

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trip Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">Orchestrate your operational dispatch lifecycle.</p>
        </div>
        <Button onClick={() => { setSelectedTrip(null); setIsFormOpen(true); }} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Draft Trip
        </Button>
      </div>

      <TripSummaryCards />
      
      <div className="mt-4">
        <TripFilters />
        <TripTable 
          trips={trips} 
          onView={(t) => { setSelectedTrip(t); setIsDrawerOpen(true); }} 
          onEdit={(t) => { setSelectedTrip(t); setIsFormOpen(true); }} 
          onDispatch={(t) => { setSelectedTrip(t); setIsDispatchOpen(true); }}
          onComplete={(t) => { setSelectedTrip(t); setIsCompleteOpen(true); }}
          onCancel={(t) => { setSelectedTrip(t); setIsCancelOpen(true); }}
          onDelete={handleDelete} 
        />
      </div>

      <TripDetailsDrawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} trip={selectedTrip} />
      
      <TripForm open={isFormOpen} onOpenChange={setIsFormOpen} trip={selectedTrip} onSave={handleSaveForm} />

      <TripDispatchDialog open={isDispatchOpen} onOpenChange={setIsDispatchOpen} onConfirm={executeDispatch} tripId={selectedTrip?.id} loading={loading} />
      
      <TripCompleteDialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen} onConfirm={executeComplete} tripId={selectedTrip?.id} loading={loading} />
      
      <TripCancelDialog open={isCancelOpen} onOpenChange={setIsCancelOpen} onConfirm={executeCancel} tripId={selectedTrip?.id} loading={loading} />
    </div>
  );
}
