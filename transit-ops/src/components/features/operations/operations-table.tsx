import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LayoutList } from 'lucide-react';

export interface ColumnDef<T> {
  header: React.ReactNode;
  cell: (item: T) => React.ReactNode;
  className?: string;
}

export function OperationsTable<T extends { id: string }>({ 
  data, 
  columns, 
  emptyMessage = "No records found" 
}: { 
  data: T[], 
  columns: ColumnDef<T>[],
  emptyMessage?: string
}) {
  return (
    <div className="rounded-md border bg-card/50 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent whitespace-nowrap">
              {columns.map((col, idx) => (
                <TableHead key={idx} className={col.className}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-[400px] text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <LayoutList className="h-10 w-10 mb-4 opacity-20" />
                    <p className="text-lg font-medium">{emptyMessage}</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id} className="group transition-colors whitespace-nowrap">
                  {columns.map((col, idx) => (
                    <TableCell key={idx} className={col.className}>
                      {col.cell(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
