import axios from "axios";
import { AppDataSource } from "../db";
import { Hotel } from "../entities/Hotel";

const repo = AppDataSource.getRepository(Hotel);

export class HotelService {
    static async getSerbianHotelsFromOSM() {
        const count = await repo.count();

        if (count === 0) {
            console.log("Database empty. Seeding from OSM...");
            const overpassUrl = 'https://overpass-api.de/api/interpreter';
            const query = `
                [out:json][timeout:25];
                area["ISO3166-1"="RS"]->.searchArea;
                (
                  node["tourism"="hotel"](area.searchArea);
                  way["tourism"="hotel"](area.searchArea);
                );
                out center 50;
            `;
            
            const response: any = await axios.get(overpassUrl, {
                params: {
                    data: query
                },
                headers: { 
                    'User-Agent': 'ProjekatHotelApp/1.0 (Student Project)'
                }
            });
            
            const newHotels = response.data.elements
                .filter((el: any) => el.tags && el.tags.name)
                .map((el: any) => {
                    const h = new Hotel();
                    h.hotelId = el.id; 
                    h.name = el.tags.name;
                    h.city = el.tags['addr:city'] || 'Srbija';
                    h.lat = el.lat || (el.center && el.center.lat) || 0;
                    h.lon = el.lon || (el.center && el.center.lon) || 0;
                    return h;
                });
            
            await repo.save(newHotels);
            console.log("Seeding complete! Data permanently stored in MySQL.");
        }

        const dbHotels = await repo.find();
        
        return dbHotels.map(h => ({
            id: h.hotelId,
            tags: { name: h.name, 'addr:city': h.city }
        }));
    }

    static async getHotelById(id: number) {
        const h = await repo.findOne({ where: { hotelId: id } });
        if (!h) throw new Error("Hotel not found in local database");
        
        return {
            id: h.hotelId,
            lat: h.lat,
            lon: h.lon,
            tags: {
                name: h.name,
                'addr:city': h.city
            }
        };
    }

    static async getAllHotels() {
        const dbHotels = await repo.find();
        
        return dbHotels.map(h => ({
            id: h.hotelId,
            lat: h.lat,
            lon: h.lon,
            tags: { name: h.name, 'addr:city': h.city }

        }));
    }
}