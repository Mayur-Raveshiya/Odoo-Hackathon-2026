import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const activities = [
  {
    id: 1,
    title: 'Trip Completed',
    description: 'James Mitchell completed trip to Boston.',
    time: '2 hours ago',
    initials: 'JM',
  },
  {
    id: 2,
    title: 'Maintenance Logged',
    description: 'VAN-5001 sent to shop for Engine Overhaul.',
    time: '5 hours ago',
    initials: 'V5',
  },
  {
    id: 3,
    title: 'Trip Dispatched',
    description: 'Sarah Connor dispatched to Philadelphia.',
    time: '1 day ago',
    initials: 'SC',
  },
  {
    id: 4,
    title: 'Vehicle Retired',
    description: 'TRK-9903 has been marked as Retired.',
    time: '2 days ago',
    initials: 'T3',
  },
];

export function RecentActivity() {
  return (
    <Card className="hover:shadow-md hover:border-primary/20 transition-all duration-200 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <CardDescription>Latest events across the fleet</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-[350px] w-full pr-4">
          <div className="space-y-2">
            {activities.map((activity) => (
              <div 
                key={activity.id}
                className="group flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
              >
                <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                    {activity.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                  <span className="text-sm font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {activity.title}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {activity.description}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground/70 mt-1.5 uppercase tracking-wider">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
