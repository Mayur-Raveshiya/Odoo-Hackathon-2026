import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, CheckCircle2, Route, Wrench, Ban, LucideIcon } from 'lucide-react';

interface SummaryData {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

const summaryData: SummaryData[] = [
  { title: 'Total Vehicles', value: 120, icon: Truck },
  { title: 'Available', value: 45, icon: CheckCircle2 },
  { title: 'On Trip', value: 62, icon: Route },
  { title: 'In Shop', value: 10, icon: Wrench },
  { title: 'Retired', value: 3, icon: Ban },
];

export function VehicleSummaryCards() {
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
