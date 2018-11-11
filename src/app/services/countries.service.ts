import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../components/home/location';
import { COUNTRIES } from '../../assets/countries';

@Injectable()
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return of(COUNTRIES);
  }

}
