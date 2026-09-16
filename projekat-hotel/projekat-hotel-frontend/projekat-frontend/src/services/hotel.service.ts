import axios from "axios";
import { MainService } from "./main.service";

const client = axios.create({
    baseURL: "http://localhost:3000/api/hotel",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    validateStatus: (status) => status == 200
})

export class HotelService {
    static async getSerbianHotels() {
        return await client.get(`/serbia/osm`)
    }

    static async getHotelById(id: number) {
        const response = await MainService.useAxios(`/hotel`) 
        const list = response.data || response;
        const hotel = list.find((h: any) => h.id === id || h.hotelId === id)
        if (!hotel) throw new Error("Hotel not found in database")
            return hotel
    }

    static async getAllHotels() {
        return await MainService.useAxios('/hotel')
    }
}