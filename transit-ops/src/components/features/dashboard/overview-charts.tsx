'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const statusData = [
  { name: 'On Trip', value: 42, fill: 'hsl(var(--chart-1))' },
  { name: 'Available', value: 18, fill: 'hsl(var(--chart-2))' },
  { name: 'In Shop', value: 5, fill: 'hsl(var(--chart-3))' },
  { name: 'Retired', value: 2, fill: 'hsl(var(--muted))' },
];

const costData = [
  { month: 'Jan', cost: 12000 },
  { month: 'Feb', cost: 15000 },
  { month: 'Mar', cost: 11000 },
  { month: 'Apr', cost: 18000 },
  { month: 'May', cost: 14000 },
  { month: 'Jun', cost: 19000 },
];

const fuelData = [
  { day: 'Mon', consumption: 400 },
  { day: 'Tue', consumption: 300 },
  { day: 'Wed', consumption: 550 },
  { day: 'Thu', consumption: 450 },
  { day: 'Fri', consumption: 600 },
  { day: 'Sat', consumption: 200 },
  { day: 'Sun', consumption: 150 },
];

const chartConfig = {
  value: { label: 'Vehicles' },
  cost: { label: 'Cost ($)' },
  consumption: { label: 'Fuel (L)' },
};

export function OverviewCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 hover:shadow-md hover:border-primary/20 transition-all duration-200">
        <CardHeader>
          <CardTitle>Vehicle Status</CardTitle>
          <CardDescription>Current fleet distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-1 hover:shadow-md hover:border-primary/20 transition-all duration-200">
        <CardHeader>
          <CardTitle>Monthly Cost</CardTitle>
          <CardDescription>Operational expenses over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costData}>
                <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Bar dataKey="cost" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-1 hover:shadow-md hover:border-primary/20 transition-all duration-200">
        <CardHeader>
          <CardTitle>Fuel Trend</CardTitle>
          <CardDescription>Weekly consumption (Liters)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fuelData}>
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Line type="monotone" dataKey="consumption" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
