import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export function VehicleFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="relative w-full sm:w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search registration, name..." className="pl-8 bg-card/50" />
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
            <SelectItem value="in-shop">In Shop</SelectItem>
            <SelectItem value="retired">Retired</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[140px] bg-card/50">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="heavy-truck">Heavy Truck</SelectItem>
            <SelectItem value="van">Van</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-auto sm:ml-auto">
        <Select defaultValue="newest">
          <SelectTrigger className="w-full sm:w-[140px] bg-card/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="reg">Registration</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
