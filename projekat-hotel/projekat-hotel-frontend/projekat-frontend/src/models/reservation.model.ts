import type { HotelPartnerModel } from "./hotel-partner.model"

export interface ReservationModel {
    hotelName: string;
    reservationId: number;
    osmHotelId: number;
    hotelId: number;
    allInclusive: boolean;
    createdAt: string;
    hotel: HotelPartnerModel;
}