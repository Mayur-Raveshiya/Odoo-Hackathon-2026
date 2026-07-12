'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import type { ExecutiveReportData } from '@/lib/services/report.service';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

export function ReportsCharts({ data }: { data: ExecutiveReportData }) {
  // Fleet Status Data
  const fleetStatusData = [
    { name: 'Active', value: data.fleet.active },
    { name: 'In Shop', value: data.fleet.inShop },
    { name: 'Retired', value: data.fleet.retired },
  ].filter(d => d.value > 0);

  // Trip Status Data
  const tripStatusData = [
    { name: 'Draft', value: data.trips.draft },
    { name: 'Active', value: data.trips.active },
    { name: 'Completed', value: data.trips.completed },
    { name: 'Cancelled', value: data.trips.cancelled },
  ].filter(d => d.value > 0);

  // Driver Availability
  const driverData = [
    { name: 'Available', value: data.drivers.available },
    { name: 'On Trip', value: data.drivers.onTrip },
    { name: 'Suspended', value: data.drivers.suspended },
  ].filter(d => d.value > 0);

  // Cost Distribution (Bar Chart)
  const costData = [
    { name: 'Maintenance', amount: data.expenses.maintenanceCost },
    { name: 'Fuel', amount: data.expenses.fuelCost },
    { name: 'Administrative', amount: data.expenses.administrativeCost },
  ];

  // Fuel Trend Mock (Since we only have aggregate right now, we simulate a trend for the chart based on total)
  const fuelTrendData = [
    { month: 'Jan', liters: Math.round(data.fuel.totalConsumed * 0.1) },
    { month: 'Feb', liters: Math.round(data.fuel.totalConsumed * 0.15) },
    { month: 'Mar', liters: Math.round(data.fuel.totalConsumed * 0.12) },
    { month: 'Apr', liters: Math.round(data.fuel.totalConsumed * 0.18) },
    { month: 'May', liters: Math.round(data.fuel.totalConsumed * 0.2) },
    { month: 'Jun', liters: Math.round(data.fuel.totalConsumed * 0.25) },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {/* Fleet Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md">Fleet Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {fleetStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={fleetStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {fleetStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No data</div>
          )}
        </CardContent>
      </Card>

      {/* Driver Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md">Driver Availability</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {driverData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={driverData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {driverData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No data</div>
          )}
        </CardContent>
      </Card>

      {/* Trip Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md">Trip Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {tripStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tripStatusData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {tripStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground text-sm">No data</div>
          )}
        </CardContent>
      </Card>

      {/* Cost Distribution */}
      <Card className="md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-md">Operational Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip formatter={(value) => `$${value}`} />
              <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Fuel Consumption Trend */}
      <Card className="md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-md">Fuel Consumption Trend (Simulated)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={fuelTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLiters" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip formatter={(value) => `${value} L`} />
              <Area type="monotone" dataKey="liters" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLiters)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
