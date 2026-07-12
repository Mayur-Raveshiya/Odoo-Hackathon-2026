import { DashboardKPIs } from '@/components/features/dashboard/kpi-cards';
import { OverviewCharts } from '@/components/features/dashboard/overview-charts';
import { AlertsPanel } from '@/components/features/dashboard/alerts-panel';
import { RecentActivity } from '@/components/features/dashboard/recent-activity';
import { QuickActions } from '@/components/features/dashboard/quick-actions';
import { Suspense } from 'react';
import { DashboardSkeleton } from '@/components/features/dashboard/dashboard-skeleton';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <Suspense fallback={<DashboardSkeleton />}>
        <div className="space-y-4 md:space-y-8">
          <DashboardKPIs />
          <OverviewCharts />
          
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4 md:space-y-8">
              <AlertsPanel />
              <RecentActivity />
            </div>
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
