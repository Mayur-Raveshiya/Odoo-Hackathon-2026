import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ExecutiveReportData } from '@/lib/services/report.service';
import { Truck, Users, Map, Wrench, Fuel, DollarSign, Activity, AlertTriangle } from 'lucide-react';

export function ReportsSummaryCards({ data }: { data: ExecutiveReportData }) {
  return (
    <div className="space-y-6">
      {/* Fleet Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Truck className="h-5 w-5 text-blue-500" /> Fleet Overview
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{data.fleet.total}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">{data.fleet.active}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Shop</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-amber-500">{data.fleet.inShop}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Retired</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-muted-foreground">{data.fleet.retired}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilization</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{data.fleet.utilizationPercent}%</div></CardContent>
          </Card>
        </div>
      </div>

      {/* Driver Analytics */}
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Users className="h-5 w-5 text-indigo-500" /> Driver Analytics
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{data.drivers.total}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">{data.drivers.available}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Trip</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-blue-500">{data.drivers.onTrip}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-red-500">{data.drivers.suspended}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Licenses</CardTitle>
              {data.drivers.expiringLicenses > 0 && <AlertTriangle className="h-4 w-4 text-amber-500" />}
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{data.drivers.expiringLicenses}</div></CardContent>
          </Card>
        </div>
      </div>

      {/* Trip Analytics */}
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Map className="h-5 w-5 text-emerald-500" /> Trip Analytics
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Trips</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-blue-500">{data.trips.active}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed (All Time)</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold text-green-600">{data.trips.completed}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Cargo Weight</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{data.trips.avgCargoWeight.toLocaleString()} kg</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Trip Distance</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{data.trips.avgDistance.toLocaleString()} km</div></CardContent>
          </Card>
        </div>
      </div>

      {/* Financials & Operations */}
      <div>
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-rose-500" /> Financial & Operational Analytics
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Operational Cost</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">${data.expenses.totalOperational.toLocaleString()}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance Cost</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">${data.expenses.maintenanceCost.toLocaleString()}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Cost</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">${data.expenses.fuelCost.toLocaleString()}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Fuel Efficiency</CardTitle>
            </CardHeader>
            <CardContent><div className="text-2xl font-bold">{data.fuel.avgEfficiency} km/L</div></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
