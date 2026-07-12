import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export function DriverFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="relative w-full sm:w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search name, license..." className="pl-8 bg-card/50" />
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[140px] bg-card/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="on-trip">On Trip</SelectItem>
            <SelectItem value="off-duty">Off Duty</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[140px] bg-card/50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="class-a">Class A</SelectItem>
            <SelectItem value="class-b">Class B</SelectItem>
            <SelectItem value="class-c">Class C</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-auto sm:ml-auto">
        <Select defaultValue="name">
          <SelectTrigger className="w-full sm:w-[140px] bg-card/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="expiry">License Expiry</SelectItem>
            <SelectItem value="safety">Safety Score</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
