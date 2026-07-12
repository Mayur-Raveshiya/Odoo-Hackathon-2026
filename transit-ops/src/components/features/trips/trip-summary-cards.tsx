import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, CheckCircle2, PlayCircle, XCircle, FileEdit, LucideIcon } from 'lucide-react';

interface SummaryData {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

const summaryData: SummaryData[] = [
  { title: 'Total Trips', value: 124, icon: Route },
  { title: 'Draft', value: 12, icon: FileEdit },
  { title: 'Active', value: 45, icon: PlayCircle },
  { title: 'Completed', value: 65, icon: CheckCircle2 },
  { title: 'Cancelled', value: 2, icon: XCircle },
];

export function TripSummaryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      {summaryData.map((data, index) => (
        <Card key={index} className="hover:shadow-md hover:border-primary/20 transition-all duration-200 group bg-card/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {data.title}
            </CardTitle>
            <data.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
