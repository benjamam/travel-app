import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LocationSearch, LocationInfo, Country, MapCoordinates } from '../../models/location';
import { MapsAPIService } from '../../services/maps.api.service';
import { CountriesService } from '../../services/countries.service';
import { SuggestionApiService } from '../../services/suggestionapi.service';
import { Observable } from 'rxjs/Observable';
import { CoordResponse } from '../../services/api.response';
import { PlaceSuggestion } from '../../models/suggestion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MapsAPIService, CountriesService, SuggestionApiService]
})

export class HomeComponent implements OnInit {
  @ViewChild('city') cityField: ElementRef;
  zoom = 3;
  location: LocationSearch = {
    selectedCity: '',
    selectedCountry: '',
    countryList: null
  };
  coord: MapCoordinates = {
    lattitude: 37.68717609999999,
    longitude: -97.33005299999999
  };
  citySuggestion: PlaceSuggestion;

  places: LocationInfo[] = [];

  apiCoordResp: CoordResponse = new CoordResponse;

  constructor(private _mapsApiService: MapsAPIService, private _countryService: CountriesService,
    private _suggestionApiService: SuggestionApiService) { }

  ngOnInit() {
    this.cityField.nativeElement.focus();
    this._countryService.getCountries().subscribe((countries: Country[]) => {
      this.location.countryList = countries.map(x => x);
      // console.log('country list', this.location.countryList);
    });
    this.location.selectedCountry = this.location.countryList[0].code;
  }

  updateCountry(country: string) {
    this.location.selectedCountry = country;
    console.log('country selected:', this.location.selectedCountry);
  }

  add(location: Location) {
    this._mapsApiService.getGPSCoordinates(this.location).subscribe(
      (data: CoordResponse) => {
        console.log(data);
        if (data.status !== 'ZERO_RESULTS') {
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
        } else {
          alert('Zero results found for: ' + this.location.selectedCity + ', ' + this.location.selectedCountry);
        }

      },
      error => alert('Error occurred'));
  }

  remove() {
    this.places.pop();
    // console.log('removed', this.places);
  }

  suggestion(preference: string) {
    console.log('places to search', this.places);
    this._suggestionApiService.getSuggestion(this.places, preference).subscribe(
      (data: PlaceSuggestion) => {
        console.log('api response', data);
        this.citySuggestion = { ...data };
      }
    );
  }

}
