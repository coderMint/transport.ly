export interface FlightElement {
    flight_number?: number | null; //in case of boxes that cannot be delivered
    departure_city: string;
    arrival_city: string;
    day?: number | null; //in case of boxes that cannot be delivered
}