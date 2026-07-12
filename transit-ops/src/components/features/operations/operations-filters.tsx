import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export interface FilterOption {
  key: string;
  placeholder: string;
  options: { value: string; label: string }[];
}

export function OperationsFilters({ 
  searchPlaceholder = "Search...", 
  filters = [] 
}: { 
  searchPlaceholder?: string;
  filters?: FilterOption[];
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <div className="relative w-full sm:w-[300px]">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder={searchPlaceholder} className="pl-8 bg-card/50" />
      </div>
      <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
        {filters.map((filter) => (
          <Select key={filter.key} defaultValue="all">
            <SelectTrigger className="w-full sm:w-[160px] bg-card/50 whitespace-nowrap">
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {filter.placeholder}</SelectItem>
              {filter.options.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
    </div>
  );
}
