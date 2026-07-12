-- ==========================================
-- TransitOps Database Schema Foundation
-- ==========================================

-- Enable pgcrypto for UUID generation if not enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. ENUMs
CREATE TYPE vehicle_status AS ENUM ('Available', 'On Trip', 'In Shop', 'Retired');
CREATE TYPE driver_status AS ENUM ('Available', 'On Trip', 'Off Duty', 'Suspended');
CREATE TYPE trip_status AS ENUM ('Draft', 'Dispatched', 'Completed', 'Cancelled');
CREATE TYPE expense_category AS ENUM ('maintenance', 'tolls', 'other operational costs');

-- 2. Tables

-- Roles
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (Extends Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY, -- Intended to map to auth.users in Supabase
    role_id UUID REFERENCES roles(id),
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vehicles
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    vehicle_name VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    vehicle_type VARCHAR(50),
    max_load_capacity NUMERIC NOT NULL CHECK (max_load_capacity > 0),
    odometer NUMERIC DEFAULT 0 CHECK (odometer >= 0),
    acquisition_cost NUMERIC CHECK (acquisition_cost >= 0),
    status vehicle_status DEFAULT 'Available' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drivers
CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    license_category VARCHAR(50),
    license_expiry_date DATE NOT NULL,
    safety_score NUMERIC CHECK (safety_score >= 0 AND safety_score <= 100),
    status driver_status DEFAULT 'Available' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trips
CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    planned_distance NUMERIC CHECK (planned_distance >= 0),
    actual_distance NUMERIC CHECK (actual_distance >= 0),
    cargo_weight NUMERIC NOT NULL CHECK (cargo_weight >= 0),
    vehicle_id UUID REFERENCES vehicles(id) NOT NULL,
    driver_id UUID REFERENCES drivers(id) NOT NULL,
    status trip_status DEFAULT 'Draft' NOT NULL,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    final_odometer NUMERIC,
    fuel_consumed NUMERIC CHECK (fuel_consumed >= 0),
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Maintenance Logs
CREATE TABLE maintenance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id) NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Open', 'Closed')),
    description TEXT NOT NULL,
    cost NUMERIC DEFAULT 0 CHECK (cost >= 0),
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fuel Logs
CREATE TABLE fuel_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id) NOT NULL,
    liters NUMERIC NOT NULL CHECK (liters > 0),
    cost NUMERIC NOT NULL CHECK (cost >= 0),
    log_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expenses
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_id UUID REFERENCES vehicles(id),
    trip_id UUID REFERENCES trips(id),
    category expense_category NOT NULL,
    amount NUMERIC NOT NULL CHECK (amount >= 0),
    expense_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indexes
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_trips_status ON trips(status);
CREATE INDEX idx_trips_vehicle_id ON trips(vehicle_id);
CREATE INDEX idx_trips_driver_id ON trips(driver_id);
CREATE INDEX idx_maintenance_vehicle_id ON maintenance_logs(vehicle_id);
CREATE INDEX idx_fuel_logs_vehicle_id ON fuel_logs(vehicle_id);
CREATE INDEX idx_expenses_vehicle_id ON expenses(vehicle_id);
CREATE INDEX idx_expenses_trip_id ON expenses(trip_id);

-- 4. Triggers for `updated_at`
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_roles_modtime BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vehicles_modtime BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_drivers_modtime BEFORE UPDATE ON drivers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trips_modtime BEFORE UPDATE ON trips FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_maintenance_modtime BEFORE UPDATE ON maintenance_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fuel_logs_modtime BEFORE UPDATE ON fuel_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_expenses_modtime BEFORE UPDATE ON expenses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. Business Rules via Triggers

-- Trigger Function: Enforce Trip Business Rules
CREATE OR REPLACE FUNCTION check_trip_business_rules()
RETURNS TRIGGER AS $$
DECLARE
    v_vehicle vehicles%ROWTYPE;
    v_driver drivers%ROWTYPE;
BEGIN
    -- Fetch Vehicle & Driver
    SELECT * INTO v_vehicle FROM vehicles WHERE id = NEW.vehicle_id;
    SELECT * INTO v_driver FROM drivers WHERE id = NEW.driver_id;
    
    -- 1. Cargo weight must never exceed vehicle capacity
    IF NEW.cargo_weight > v_vehicle.max_load_capacity THEN
        RAISE EXCEPTION 'Cargo weight (%) exceeds vehicle capacity (%).', NEW.cargo_weight, v_vehicle.max_load_capacity;
    END IF;

    -- Validations when dispatching a trip (or inserting a pre-dispatched trip)
    IF (TG_OP = 'INSERT' AND NEW.status = 'Dispatched') OR 
       (TG_OP = 'UPDATE' AND NEW.status = 'Dispatched' AND OLD.status != 'Dispatched') THEN
        
        -- 2. Retired vehicles cannot be dispatched
        IF v_vehicle.status = 'Retired' THEN
            RAISE EXCEPTION 'Retired vehicles cannot be assigned to trips.';
        END IF;

        -- 3. In Shop vehicles cannot be dispatched
        IF v_vehicle.status = 'In Shop' THEN
            RAISE EXCEPTION 'Vehicles in shop cannot be assigned to trips.';
        END IF;

        -- 4. Suspended drivers cannot be assigned
        IF v_driver.status = 'Suspended' THEN
            RAISE EXCEPTION 'Suspended drivers cannot be assigned to trips.';
        END IF;

        -- 5. Drivers with expired licenses cannot be assigned
        IF v_driver.license_expiry_date < CURRENT_DATE THEN
            RAISE EXCEPTION 'Drivers with expired licenses cannot be assigned to trips.';
        END IF;

        -- 6. Vehicle already On Trip cannot be assigned
        IF v_vehicle.status = 'On Trip' THEN
            RAISE EXCEPTION 'Vehicle is already on a trip.';
        END IF;

        -- 7. Driver already On Trip cannot be assigned
        IF v_driver.status = 'On Trip' THEN
            RAISE EXCEPTION 'Driver is already on a trip.';
        END IF;
    END IF;

    -- State transition management for side-effects
    IF TG_OP = 'UPDATE' THEN
        -- Dispatch Trip -> Change Vehicle/Driver to On Trip
        IF NEW.status = 'Dispatched' AND OLD.status = 'Draft' THEN
            UPDATE vehicles SET status = 'On Trip' WHERE id = NEW.vehicle_id;
            UPDATE drivers SET status = 'On Trip' WHERE id = NEW.driver_id;
            NEW.start_time = COALESCE(NEW.start_time, NOW());
        END IF;

        -- Complete/Cancel Trip -> Restore Vehicle/Driver to Available
        IF (NEW.status = 'Completed' OR NEW.status = 'Cancelled') AND OLD.status = 'Dispatched' THEN
            UPDATE vehicles SET status = 'Available' WHERE id = NEW.vehicle_id AND status != 'Retired';
            UPDATE drivers SET status = 'Available' WHERE id = NEW.driver_id AND status != 'Suspended';
            
            IF NEW.status = 'Completed' THEN
                NEW.end_time = COALESCE(NEW.end_time, NOW());
                -- Update Vehicle Odometer if Final Odometer provided
                IF NEW.final_odometer IS NOT NULL THEN
                    UPDATE vehicles SET odometer = NEW.final_odometer WHERE id = NEW.vehicle_id;
                END IF;
            END IF;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trip_rules_trigger
BEFORE INSERT OR UPDATE ON trips
FOR EACH ROW EXECUTE FUNCTION check_trip_business_rules();


-- Trigger Function: Enforce Maintenance Rules
CREATE OR REPLACE FUNCTION check_maintenance_rules()
RETURNS TRIGGER AS $$
DECLARE
    v_vehicle_status vehicle_status;
BEGIN
    SELECT status INTO v_vehicle_status FROM vehicles WHERE id = NEW.vehicle_id;
    
    -- Creating Maintenance -> Vehicle to In Shop
    IF TG_OP = 'INSERT' AND NEW.status = 'Open' THEN
        IF v_vehicle_status = 'On Trip' THEN
            RAISE EXCEPTION 'Cannot put a vehicle in maintenance while on a trip.';
        END IF;
        UPDATE vehicles SET status = 'In Shop' WHERE id = NEW.vehicle_id;
    END IF;

    -- Closing Maintenance -> Vehicle to Available (unless Retired)
    IF TG_OP = 'UPDATE' AND NEW.status = 'Closed' AND OLD.status = 'Open' THEN
        IF v_vehicle_status != 'Retired' THEN
            UPDATE vehicles SET status = 'Available' WHERE id = NEW.vehicle_id;
        END IF;
        NEW.end_date = COALESCE(NEW.end_date, NOW());
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER maintenance_rules_trigger
BEFORE INSERT OR UPDATE ON maintenance_logs
FOR EACH ROW EXECUTE FUNCTION check_maintenance_rules();
