import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Activity, Wrench, Route, MapPin, Users, Percent, LucideIcon } from 'lucide-react';

interface KpiData {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
}

const kpiData: KpiData[] = [
  { title: 'Active Vehicles', value: '42', description: '+2 from last week', icon: Activity },
  { title: 'Available Vehicles', value: '18', description: 'Ready for dispatch', icon: Truck },
  { title: 'Vehicles In Shop', value: '5', description: '2 pending parts', icon: Wrench },
  { title: 'Active Trips', value: '38', description: '+5% from yesterday', icon: Route },
  { title: 'Pending Trips', value: '12', description: 'Awaiting dispatch', icon: MapPin },
  { title: 'Drivers On Duty', value: '45', description: '90% of total roster', icon: Users },
  { title: 'Fleet Utilization', value: '85%', description: '+2% from last month', icon: Percent },
];

export function DashboardKPIs() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="hover:shadow-md hover:border-primary/20 transition-all duration-200 group bg-card/40 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium tracking-tight text-muted-foreground group-hover:text-foreground transition-colors">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">{kpi.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
