export class LocationSearch {
    selectedCity: string;
    selectedCountry: string;
    countryList: string[];
}

export class Country {
    name: string;
    code: string;
}

export class MapCoordinates {
    lattitude: number;
    longitude: number;
}

export class LocationInfo {
    fullName: string;
    city: string;
    coordinates: MapCoordinates;
}
