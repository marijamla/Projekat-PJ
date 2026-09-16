import axios from 'axios';

const client = axios.create({
    baseURL: 'https://overpass-api.de/api',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain'
    }
})

export class OsmService {
    static async getSerbianHotels() {
        const query = `
            [out:json][timeout:25];
            area["ISO3166-1"="RS"]->.searchArea;
            (
              node["tourism"="hotel"](area.searchArea);
              way["tourism"="hotel"](area.searchArea);
            );
            out center 50;
        `;
        
        const rsp = await client.post(`/interpreter`, query);
        return rsp.data.elements;
    }
}