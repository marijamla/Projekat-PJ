import axios from "axios";
import { MainService } from "./main.service";

export class ReservationService {
    static async getAllReservations() {
        return await MainService.useAxios('/reservation')
    }

    static async createReservation(payload: any) {
        return await MainService.useAxios('/reservation', 'post', payload)
    }

    static async deleteReservation(id: number) {
        return await MainService.useAxios(`/reservation/${id}`, 'delete')
    }
}