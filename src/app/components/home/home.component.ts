import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocationSearch, MapCoordinates, LocationInfo, Country } from './location';
import { MapsAPIService } from '../../services/maps.api.service';
import { CountriesService } from '../../services/countries.service';
import { Observable } from 'rxjs/Observable';
import { CoordResponse } from '../../services/api.response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MapsAPIService, CountriesService]
})

export class HomeComponent implements OnInit {
  @ViewChild('city') cityField: ElementRef;
  zoom = 3;
  location: LocationSearch = {
    selectedCity: '',
    selectedCountry: '',
    countryList: ['']
  };
  coord: MapCoordinates = {
    lattitude: 37.68717609999999,
    longitude: -97.33005299999999
  };
  places: LocationInfo[] = [];

  apiCoordResp: CoordResponse = new CoordResponse;

  constructor(private _mapsApiService: MapsAPIService, private _countryService: CountriesService) { }

  ngOnInit() {
    this.cityField.nativeElement.focus();
    this._countryService.getCountries().subscribe((countries: Country[]) => {
      console.log('raw data', countries);
      console.log('first', countries[0]);
      this.location.countryList = countries.map(x => x.name);
      console.log('country list: ', this.location.countryList);
      // this.location.countryList = ['test', 'test2'];
      // console.log('country list updated', this.location.countryList);
    });
  }

  updateCountry(country: string) {
    this.location.selectedCountry = country;
    console.log('country selected:', this.location.selectedCountry);
  }

  add(location: Location) {
    this._mapsApiService.getGPSCoordinates(this.location).subscribe(
      (data: CoordResponse) => {
        // console.log(data);
        this.apiCoordResp = { ...data };
        this.coord.lattitude = this.apiCoordResp.results[0].geometry.location.lat;
        this.coord.longitude = this.apiCoordResp.results[0].geometry.location.lng;
        this.places.push({
          fullName: this.apiCoordResp.results[0].formatted_address,
          city: this.apiCoordResp.results[0].formatted_address.split(',')[0],
          coordinates: { ...this.coord }
        });
        this.location.selectedCity = '';
        this.cityField.nativeElement.focus();
      });
  }

  remove() {
    this.places.pop();
    console.log('removed', this.places);
  }

}
