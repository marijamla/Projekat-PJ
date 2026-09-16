import { IsNull } from "typeorm";
import { AppDataSource } from "../db";
import { Reservation } from "../entities/Reservation";
import { UserService } from "./user.service";
import {Hotel } from "../entities/Hotel";

const repo = AppDataSource.getRepository(Reservation)

export class ReservationService {
    static async getAllReservations(auth: any) {
        const data = await repo.find({
            select: {
                reservationId: true,
                osmHotelId: true,
                hotelId: true,
                allInclusive: true,
                createdAt: true,
                hotelName: true
            },
            where: {
                deletedAt: IsNull()
            },
            relations: {
                hotel: true
            }
        })

        return data
    }
   

static async createReservation(auth: any, reservation: Reservation) {
    const user = await UserService.getByEmail(auth.email)
    reservation.userId = user.userId
    reservation.deletedAt = null
    reservation.createdAt = new Date()
    const targetHotelId = reservation.hotelId || reservation.osmHotelId;

    if (targetHotelId) {
        const hotelRepo = AppDataSource.getRepository(Hotel);
        const hotel = await hotelRepo.findOne({ 
            where: { hotelId: Number(targetHotelId) } 
        });
        reservation.hotelName = hotel ? hotel.name : 'Individualni smeštaj';
    } else {
        reservation.hotelName = 'Individualni smeštaj';
    }

    const data = await repo.save(reservation)
    const { deletedAt: _deletedAt, ...result } = data
    return result
}

    static async deleteReservation(id: number) {
        const data = await repo.findOne({
            where: {
                reservationId: id,
                deletedAt: IsNull() 
            }
        })

        if (data == undefined) 
        throw new Error('Reservation not found')
        

        data.deletedAt = new Date()
        await repo.save(data)
    }
}