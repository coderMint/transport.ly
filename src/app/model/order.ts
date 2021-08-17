import { FlightElement } from "./flight";

interface OrderDetails {
    destination: string;
}

interface OrderStruct extends OrderDetails{
    orderId: string;
}

// use this interface for normalizing the order data
export interface OrderElement extends OrderStruct, FlightElement{}