export interface HotelModel {
    id: number;
    lat?: number;
    lon?: number;
    center?: {
        lat: number;
        lon: number;
    };
    tags: {
        name?: string;
        'addr:city'?: string;
        'addr:street'?: string;
        'addr:housenumber'?: string;
        website?: string;
        stars?: string;
        [key: string]: any;
    };
}