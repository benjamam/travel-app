import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LocationSearch, MapCoordinates } from '../components/home/location';
import { map } from 'rxjs/operators';
import { CoordResponse } from './api.response';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MapsAPIService {

    constructor(private http: HttpClient) { }

    // Uses http.get() to load data from a single API endpoint
    getGPSCoordinates(location: LocationSearch): Observable<CoordResponse> {
        const url: string = 'https://maps.googleapis.com/maps/api/geocode/json?components=locality:' + location.selectedCity +
            '|country:' + location.selectedCountry + '&key=AIzaSyDb1bjMXaA13YQLpIct8RBn2jm0TORQC7E';
        return this.http.get<CoordResponse>(url);
    }

}
