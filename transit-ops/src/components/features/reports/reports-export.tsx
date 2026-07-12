'use client';

import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import type { ExecutiveReportData } from '@/lib/services/report.service';

export function ReportsExport({ data }: { data: ExecutiveReportData }) {
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleExportCSV = (filename: string, rows: any[]) => {
    if (!rows || !rows.length) {
      alert('No data available to export.');
      return;
    }
    
    // Extract headers
    const headers = Object.keys(rows[0]).join(',');
    
    // Extract rows
    const csvRows = rows.map(row => {
      return Object.values(row).map(value => {
        // Escape quotes and wrap in quotes if contains comma
        const strVal = String(value);
        if (strVal.includes(',') || strVal.includes('"')) {
          return `"${strVal.replace(/"/g, '""')}"`;
        }
        return strVal;
      }).join(',');
    });
    
    const csvContent = [headers, ...csvRows].join('\n');
    
    // Trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 no-print">
      <Button variant="outline" size="sm" onClick={() => handleExportCSV('vehicles_export', data.raw.vehicles)}>
        <Download className="mr-2 h-4 w-4" /> Vehicles CSV
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExportCSV('drivers_export', data.raw.drivers)}>
        <Download className="mr-2 h-4 w-4" /> Drivers CSV
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExportCSV('trips_export', data.raw.trips)}>
        <Download className="mr-2 h-4 w-4" /> Trips CSV
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExportCSV('maintenance_export', data.raw.maintenance)}>
        <Download className="mr-2 h-4 w-4" /> Maintenance CSV
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExportCSV('fuel_export', data.raw.fuel)}>
        <Download className="mr-2 h-4 w-4" /> Fuel CSV
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleExportCSV('expenses_export', data.raw.expenses)}>
        <Download className="mr-2 h-4 w-4" /> Expenses CSV
      </Button>
      
      <div className="flex-1"></div>
      
      <Button onClick={() => window.print()}>
        <Printer className="mr-2 h-4 w-4" /> Print Report
      </Button>
    </div>
  );
}
