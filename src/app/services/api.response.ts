export class CoordResponse {
    results: Results[];
    status: string;
}

class Results {
    address_components: AddressComponent[];
    geometry: Geometry;
    formatted_address: string;
    place_id: string;
}

class Geometry {
    location: Location;
}

class Location {
    lat: number;
    lng: number;
}

class AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}
