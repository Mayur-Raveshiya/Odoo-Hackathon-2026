'use server';

import { ReportService } from '@/lib/services/report.service';

export async function getExecutiveReportAction() {
  return await ReportService.generateExecutiveReport();
}
