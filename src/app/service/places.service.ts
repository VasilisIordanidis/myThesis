import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlaceResult } from '../view-models/PlaceResults';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private places!: google.maps.places.PlacesService;
  private map!: google.maps.Map;
  private autocomplete!: google.maps.places.Autocomplete;
  private markers: google.maps.Marker[] = [];
  private infoWindow!: google.maps.InfoWindow;
  private MARKER_PATH =
    'https://developers.google.com/maps/documentation/javascript/images/marker_green';
  state: BehaviorSubject<PlaceResult[]> = new BehaviorSubject(
    [] as PlaceResult[]
  );
  private resultView: PlaceResult[] = [];
  constructor() {}

  onInitialMapIntent(map: google.maps.Map) {
    this.map = map;
    this.places = new google.maps.places.PlacesService(map);
  }

  onInitialAutocompleteIntent(autocomplete: google.maps.places.Autocomplete) {
    this.autocomplete = autocomplete;
  }

  onPlaceChanged(): any {
    let place = this.autocomplete.getPlace();
    if (place.geometry && place.geometry.location) {
      this.map.panTo(place.geometry.location);
      this.map.setZoom(15);
      this.search();
    } else {
      window.alert('Something went wrong try again');
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
          if (this.markers.length > 0) {
            this.clearMarkers();
            this.resultView = [];
            this.state.next(this.resultView);
          }
          for (let item of results) {
            console.log(item);

            // let letter = String.fromCharCode(
            //   'A'.charCodeAt(0) + (results.indexOf(item) % 26)
            // );
            // let icon = this.MARKER_PATH + letter + '.png';
            // this.markers.push(
            //   new google.maps.Marker({
            //     position: item.geometry?.location,
            //     animation: google.maps.Animation.DROP,
            //     map: this.map,
            //     icon: icon,
            //   })
            // );
            this.placeMarkers(item, results.indexOf(item));
            let imgHandler: string[] = [];
            item.photos?.forEach((img) =>
              imgHandler.push(
                img.getUrl({
                  maxHeight: 100,
                  maxWidth: 100,
                } as google.maps.places.PhotoOptions)
              )
            );
            let placeView = {
              marker_icon: this.markers[results.indexOf(item)].getIcon(),
              name: item.name,
              rating: item.rating,
              address: item.vicinity,
              photos: imgHandler,
              total_reviews: item?.user_ratings_total,
            } as PlaceResult;
            this.resultView.push(placeView);
          }
          this.state.next(this.resultView);
        }
      }
    );
  }

  clearMarkers() {
    for (let marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];
  }

  placeMarkers(place: google.maps.places.PlaceResult, index: number) {
    let letter = String.fromCharCode('A'.charCodeAt(0) + (index % 26));
    let icon = this.MARKER_PATH + letter + '.png';
    this.markers.push(
      new google.maps.Marker({
        position: place.geometry?.location,
        animation: google.maps.Animation.DROP,
        map: this.map,
        icon: icon,
      })
    );
  }
}
