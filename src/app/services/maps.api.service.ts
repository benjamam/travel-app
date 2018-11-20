import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocationSearch, MapCoordinates } from '../models/location';
import { map } from 'rxjs/operators';
import { CoordResponse } from './api.response';
import { GoogleAPIKey } from '../../config/api_key';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MapsAPIService {

    constructor(private http: HttpClient) { }

    // Uses http.get() to load data from a single API endpoint
    getGPSCoordinates(location: LocationSearch): Observable<CoordResponse> {
        const url: string = 'https://maps.googleapis.com/maps/api/geocode/json?components=locality:' + location.selectedCity +
            '|country:' + location.selectedCountry + '&key=' + GoogleAPIKey;
        console.log(url);
        return this.http.get<CoordResponse>(url);
    }

}
