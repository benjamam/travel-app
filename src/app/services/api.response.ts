export class CoordResponse {
    results: Results[];
    status: string;
}

class Results {
    geometry: Geometry;
    formatted_address: string;
}

class Geometry {
    location: Location;
}

class Location {
    lat: number;
    lng: number;
}
