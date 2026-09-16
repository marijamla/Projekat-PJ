import { Router } from "express"
import { HotelService } from "../services/hotel.service"

export const HotelRoute = Router();

HotelRoute.get('/', async (req, res) => {
    try {
        res.json(await HotelService.getAllHotels());
    } catch (e: any) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        });
    }
});

HotelRoute.get('/:id', async (req, res) => {
    try {
        const hotelId = Number(req.params.id);
        res.json(await HotelService.getHotelById(hotelId));
    } catch (e: any) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        });
    }
});

HotelRoute.get('/serbia/osm', async (req, res) => {
    try {
        res.json(await HotelService.getSerbianHotelsFromOSM());
    } catch (e: any) {
        console.error("OSM Error details:", e.response?.data || e.message);

        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        });
    }
});