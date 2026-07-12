import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-full animate-pulse">
      {/* KPI Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2 p-6 border rounded-xl shadow-sm bg-card/20">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-8 w-[60px] mb-1" />
            <Skeleton className="h-3 w-[120px]" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-xl shadow-sm p-6 bg-card/20">
            <Skeleton className="h-5 w-[150px] mb-2" />
            <Skeleton className="h-4 w-[200px] mb-6" />
            <Skeleton className="h-[250px] w-full" />
          </div>
        ))}
      </div>
      
      {/* Lower Section Skeleton */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 md:space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border rounded-xl shadow-sm p-6 bg-card/20 h-[300px]" />
            <div className="border rounded-xl shadow-sm p-6 bg-card/20 h-[300px]" />
          </div>
          <div className="border rounded-xl shadow-sm p-6 bg-card/20 h-[450px]" />
        </div>
        <div className="lg:col-span-1">
          <div className="border rounded-xl shadow-sm p-6 bg-card/20 h-[300px]" />
        </div>
      </div>
    </div>
  );
}
