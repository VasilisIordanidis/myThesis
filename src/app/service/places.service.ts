import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private places!: google.maps.places.PlacesService;
  private map!: google.maps.Map;
  private autocomplete!: google.maps.places.Autocomplete;

  constructor() {}

  setMap(map: google.maps.Map) {
    this.map = map;
    this.places = new google.maps.places.PlacesService(map);
  }

  setAutocomplete(autocomplete: google.maps.places.Autocomplete) {
    this.autocomplete = autocomplete;
  }

  onPlaceChanged(): any {
    let place = this.autocomplete.getPlace();
    if (place.geometry && place.geometry.location) {
      this.map.panTo(place.geometry.location);
      this.map.setZoom(15);
      this.search();
    } else {
      console.log('fml');
    }
  }

  search() {
    let search = {
      bounds: this.map.getBounds() as google.maps.LatLngBounds,
      types: ['tourist_attraction'],
    };

    this.places.nearbySearch(
      search,
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus,
        pagination: google.maps.places.PlaceSearchPagination | null
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let item of results) {
            new google.maps.Marker({
              position: item.geometry?.location,
              animation: google.maps.Animation.DROP,
              map: this.map,
            });
          }
        }
      }
    );
  }
}
