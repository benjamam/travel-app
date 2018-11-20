import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SuggestionAPIUrl } from '../../config/api_route';
import { LocationInfo } from '../models/location';
import { PlaceSuggestion } from '../models/suggestion';

@Injectable()
export class SuggestionApiService {

  constructor(private http: HttpClient) { }

  getSuggestion(locations: LocationInfo[], preference: string): Observable<PlaceSuggestion> {
    const url = SuggestionAPIUrl + '/' + preference;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(JSON.stringify(locations));
    return this.http.post<PlaceSuggestion>(url, JSON.stringify(locations), httpOptions);
  }
}
