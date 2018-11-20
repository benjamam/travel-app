export class LocationSearch {
    selectedCity: string;
    selectedCountry: string;
    countryList: Country[];
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
