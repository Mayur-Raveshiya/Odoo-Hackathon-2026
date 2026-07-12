import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, UserPlus, Truck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  return (
    <Card className="hover:shadow-md hover:border-primary/20 transition-all duration-200 h-full">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Common fleet operations</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Link href="/vehicles" passHref>
          <Button variant="outline" className="w-full justify-between group h-12">
            <span className="flex items-center font-medium">
              <Truck className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              Add Vehicle
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground/50 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Button>
        </Link>
        <Link href="/drivers" passHref>
          <Button variant="outline" className="w-full justify-between group h-12">
            <span className="flex items-center font-medium">
              <UserPlus className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              Add Driver
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground/50 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Button>
        </Link>
        <Link href="/trips" passHref>
          <Button variant="outline" className="w-full justify-between group h-12">
            <span className="flex items-center font-medium">
              <PlusCircle className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              Create Trip
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground/50 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Button>
        </Link>
        <Link href="/reports" passHref>
          <Button variant="outline" className="w-full justify-between group h-12">
            <span className="flex items-center font-medium">
              <FileText className="mr-3 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              Open Reports
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground/50 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
