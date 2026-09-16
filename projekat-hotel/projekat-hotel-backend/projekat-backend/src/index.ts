import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './db';
import { HotelRoute } from './routes/hotel.route';
import { ReservationRouter } from './routes/reservation.route';
import { UserService } from './services/user.service';
import { configDotenv } from 'dotenv';
import { UserRoute } from './routes/user.route';

const app = express()
app.use(express.json())
app.use(morgan('short'))
app.use(cors())
configDotenv()

AppDataSource.initialize()
.then(() => {
    const port = process.env.SERVER_PORT || 3000
    console.log('Connected to database')

    app.use('/api/hotel', HotelRoute);
    app.use(UserService.verifyToken);
    app.use('/api/user', UserRoute);
    app.use('/api/reservation', ReservationRouter);
    app.listen(port, () => console.log(`Listening on port ${port}`))
})
.catch(e => console.log(e))
