import { Component, OnInit } from '@angular/core';
import { LocationSearch, MapCoordinates, LocationInfo } from './location';
import { MapsAPIService } from '../../services/maps.api.service';
import { Observable } from 'rxjs/Observable';
import { CoordResponse } from '../../services/api.response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MapsAPIService]
})

export class HomeComponent implements OnInit {
  zoom = 3;
  location: LocationSearch = {
    city: '',
    country: 'United States'
  };
  coord: MapCoordinates = {
    lattitude: 41.4977042,
    longitude: -81.8459445
  };
  places: LocationInfo[] = [];

  apiCoordResp: CoordResponse = new CoordResponse;

  constructor(private _mapsApiService: MapsAPIService) { }

  ngOnInit() {
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
        this.location.city = '';
      });
  }

}
