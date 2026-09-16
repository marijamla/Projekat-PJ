import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Hotel } from './entities/Hotel';
import { Reservation } from './entities/Reservation';
import { User } from './entities/User';
import path from 'path'

dotenv.config()

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASSWORD);
console.log("DB Host:", process.env.DB_HOST);
console.log("DB Name:", process.env.DB_NAME);
console.log("DB Port:", process.env.DB_PORT);
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
    entities: [Hotel, Reservation, User],
    synchronize: true, 
    logging: false
})