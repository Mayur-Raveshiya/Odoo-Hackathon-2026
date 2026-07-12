export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">Overview of TransitOps fleet status.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="tracking-tight text-sm font-medium">Active Vehicles</h3>
          <div className="text-2xl font-bold">--</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="tracking-tight text-sm font-medium">Active Trips</h3>
          <div className="text-2xl font-bold">--</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="tracking-tight text-sm font-medium">Vehicles In Shop</h3>
          <div className="text-2xl font-bold">--</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
          <h3 className="tracking-tight text-sm font-medium">Fleet Utilization</h3>
          <div className="text-2xl font-bold">--%</div>
        </div>
      </div>
    </div>
  );
}
