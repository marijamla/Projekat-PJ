import { Router } from "express";
import { ReservationService } from "../services/reservation.service";

export const ReservationRouter = Router();

ReservationRouter.get('/', async (req: any, res) => {
    try {
        res.json(await ReservationService.getAllReservations(req.user));
    } catch (e: any) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        });
    }
});

ReservationRouter.post('/', async (req: any, res) => {
    try {
        res.json(await ReservationService.createReservation(req.user, req.body));
    } catch (e: any) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        });
    }
});

ReservationRouter.delete('/:id', async (req, res) => {
    try {
        const id = Number.parseInt(req.params.id);
        await ReservationService.deleteReservation(id);
        res.status(204).send();
    } catch (e: any) {
        res.status(500).json({
            message: e.message,
            timestamp: new Date()
        });
    }
});