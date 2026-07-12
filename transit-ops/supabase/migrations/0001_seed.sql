-- ==========================================
-- TransitOps Realistic Seed Data
-- ==========================================

-- Insert Roles
INSERT INTO roles (id, name) VALUES 
('11111111-1111-1111-1111-111111111111', 'Admin'),
('22222222-2222-2222-2222-222222222222', 'Manager'),
('33333333-3333-3333-3333-333333333333', 'Dispatcher')
ON CONFLICT (name) DO NOTHING;

-- Insert Vehicles
INSERT INTO vehicles (id, registration_number, vehicle_name, manufacturer, model, vehicle_type, max_load_capacity, odometer, acquisition_cost, status) VALUES
('a1111111-1111-1111-1111-111111111111', 'TRK-9901', 'Alpha Hauler', 'Volvo', 'FH16', 'Heavy Truck', 25000, 150000, 145000, 'Available'),
('a2222222-2222-2222-2222-222222222222', 'TRK-9902', 'Beta Cruiser', 'Scania', 'R500', 'Heavy Truck', 22000, 85000, 130000, 'Available'),
('a3333333-3333-3333-3333-333333333333', 'VAN-5001', 'City Sprinter', 'Mercedes', 'Sprinter', 'Van', 3500, 45000, 55000, 'In Shop'),
('a4444444-4444-4444-4444-444444444444', 'TRK-9903', 'Gamma Transporter', 'MAN', 'TGX', 'Heavy Truck', 24000, 320000, 120000, 'Retired')
ON CONFLICT (registration_number) DO NOTHING;

-- Insert Drivers
INSERT INTO drivers (id, full_name, contact_number, email, license_number, license_category, license_expiry_date, safety_score, status) VALUES
('d1111111-1111-1111-1111-111111111111', 'James Mitchell', '+1-555-0101', 'james.m@example.com', 'DL-CA-9901', 'Class A', '2028-12-31', 98, 'Available'),
('d2222222-2222-2222-2222-222222222222', 'Sarah Connor', '+1-555-0102', 'sarah.c@example.com', 'DL-NY-8802', 'Class A', '2027-06-15', 92, 'Available'),
('d3333333-3333-3333-3333-333333333333', 'Michael Scott', '+1-555-0103', 'michael.s@example.com', 'DL-PA-7703', 'Class B', '2025-01-01', 75, 'Suspended'),
('d4444444-4444-4444-4444-444444444444', 'Dwight Schrute', '+1-555-0104', 'dwight.s@example.com', 'DL-PA-7704', 'Class A', '2026-11-20', 100, 'Off Duty')
ON CONFLICT (license_number) DO NOTHING;

-- Insert Trips (Drafts only, to avoid trigger side effects blocking seed logic if ordering is complex)
INSERT INTO trips (id, source, destination, planned_distance, cargo_weight, vehicle_id, driver_id, status) VALUES
('t1111111-1111-1111-1111-111111111111', 'Warehouse A (New York)', 'Distribution Center (Boston)', 215, 18000, 'a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'Draft'),
('t2222222-2222-2222-2222-222222222222', 'Port Authority (Newark)', 'Retail Outlet (Philadelphia)', 95, 15000, 'a2222222-2222-2222-2222-222222222222', 'd2222222-2222-2222-2222-222222222222', 'Draft')
ON CONFLICT (id) DO NOTHING;

-- Insert Maintenance Logs
INSERT INTO maintenance_logs (id, vehicle_id, status, description, cost) VALUES
('m1111111-1111-1111-1111-111111111111', 'a3333333-3333-3333-3333-333333333333', 'Open', 'Routine Engine Overhaul and Brake Pad Replacement', 1200)
ON CONFLICT (id) DO NOTHING;

-- Insert Fuel Logs
INSERT INTO fuel_logs (id, vehicle_id, liters, cost) VALUES
('f1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 450, 600),
('f2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 300, 410)
ON CONFLICT (id) DO NOTHING;

-- Insert Expenses
INSERT INTO expenses (id, vehicle_id, category, amount) VALUES
('e1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'tolls', 45.50),
('e2222222-2222-2222-2222-222222222222', 'a3333333-3333-3333-3333-333333333333', 'maintenance', 1200)
ON CONFLICT (id) DO NOTHING;
