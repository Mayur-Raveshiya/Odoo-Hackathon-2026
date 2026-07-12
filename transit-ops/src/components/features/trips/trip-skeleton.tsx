import { Skeleton } from '@/components/ui/skeleton';

export function TripSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-full animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-9 w-[200px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2 p-6 border rounded-xl shadow-sm bg-card/20">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-8 w-[60px]" />
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Skeleton className="h-10 w-full sm:w-[300px]" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[140px]" />
          <Skeleton className="h-10 w-[140px]" />
        </div>
        <Skeleton className="h-10 w-[140px] sm:ml-auto" />
      </div>

      <div className="border rounded-xl mt-4 shadow-sm bg-card/20 overflow-hidden">
        <div className="flex items-center p-4 border-b">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-[100px] mr-auto" />
          ))}
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center p-4 border-b last:border-0">
            <Skeleton className="h-4 w-[120px] mr-auto" />
            <Skeleton className="h-8 w-[140px] mr-auto" />
            <Skeleton className="h-4 w-[100px] mr-auto" />
            <Skeleton className="h-4 w-[100px] mr-auto" />
            <Skeleton className="h-4 w-[60px] mr-auto" />
            <Skeleton className="h-6 w-[80px] rounded-full mr-auto" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
