/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { getExecutiveReportAction } from './actions';
import type { ExecutiveReportData } from '@/lib/services/report.service';
import { ReportsSummaryCards } from '@/components/features/reports/reports-summary-cards';
import { ReportsCharts } from '@/components/features/reports/reports-charts';
import { ReportsExport } from '@/components/features/reports/reports-export';
import { Loader2 } from 'lucide-react';

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ExecutiveReportData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    setLoading(true);
    const data = await getExecutiveReportAction();
    setReportData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading || !reportData) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Generating Executive Report...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:gap-8 md:p-8 report-container">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">Comprehensive operational overview and financial analytics.</p>
        </div>
        <ReportsExport data={reportData} />
      </div>

      <div className="print-content">
        <ReportsSummaryCards data={reportData} />
        <ReportsCharts data={reportData} />
      </div>
      
      {/* Print styling */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .report-container, .report-container * {
            visibility: visible;
          }
          .no-print {
            display: none !important;
          }
          .report-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}} />
    </div>
  );
}
