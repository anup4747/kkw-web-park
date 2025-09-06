export type ParkingSpot = {
    id: string;
    occupied: boolean;
    type: 'car' | 'faculty' | 'bus';
    zone: string;
};

export type Slot = {
    name: string;
    occupied: number;
    capacity: number;
    location: string;
    guestSlots?: number;
    guestOccupied?: number;
};

export type Bus_type = {
    id: string;
    route: string;
    status: 'active' | 'maintenance' | 'offline';
    driver: string;
    capacity: number;
    currentPassengers: number;
};
