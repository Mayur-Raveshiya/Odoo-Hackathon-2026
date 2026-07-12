import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const maintenanceAlerts = [
  { id: 'VAN-5001', issue: 'Engine Overhaul', status: 'In Shop', urgent: true },
  { id: 'TRK-9903', issue: 'Brake Replacement', status: 'In Shop', urgent: true },
  { id: 'TRK-9901', issue: 'Scheduled Service', status: 'Pending', urgent: false },
];

const licenseExpiries = [
  { name: 'Michael Scott', date: 'Jan 01, 2025', urgent: true },
  { name: 'Dwight Schrute', date: 'Nov 20, 2026', urgent: false },
  { name: 'Sarah Connor', date: 'Jun 15, 2027', urgent: false },
];

export function AlertsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="hover:shadow-md hover:border-primary/20 transition-all duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Maintenance Alerts
          </CardTitle>
          <CardDescription>Vehicles requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[220px] w-full pr-4">
            <div className="space-y-4">
              {maintenanceAlerts.map((alert, i) => (
                <div key={i} className="group flex items-center justify-between border-b pb-3 pt-1 last:border-0 last:pb-0 hover:bg-muted/50 rounded-md px-2 -mx-2 transition-colors">
                  <div>
                    <p className="text-sm font-semibold tracking-tight">{alert.id}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.issue}</p>
                  </div>
                  <Badge variant={alert.urgent ? 'destructive' : 'secondary'} className="font-medium">
                    {alert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md hover:border-primary/20 transition-all duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-amber-500" />
            License Expiries
          </CardTitle>
          <CardDescription>Drivers requiring renewal soon</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[220px] w-full pr-4">
            <div className="space-y-4">
              {licenseExpiries.map((license, i) => (
                <div key={i} className="group flex items-center justify-between border-b pb-3 pt-1 last:border-0 last:pb-0 hover:bg-muted/50 rounded-md px-2 -mx-2 transition-colors">
                  <div>
                    <p className="text-sm font-semibold tracking-tight">{license.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Expires: {license.date}</p>
                  </div>
                  {license.urgent && (
                    <Badge variant="destructive" className="font-medium">Urgent</Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
