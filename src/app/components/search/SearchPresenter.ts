import { Injectable } from '@angular/core';
import { Intent } from 'src/app/models/Intent';
import { PlacesService } from 'src/app/service/places.service';
import { InitialIntent } from './InitialIntent';
import { SearchIntent } from './SearchIntent';

@Injectable({
  providedIn: 'root',
})
export class SearchPresenter {
  //   private map = {} as google.maps.Map;
  //   private mapCenter = {} as google.maps.LatLngLiteral;
  //public state: Subject<google.maps.Map> = new Subject<google.maps.Map>();
  constructor(private service: PlacesService) {
    console.log('Search Presenter');
  }

  onIntent(intent: Intent) {
    if (intent instanceof InitialIntent) {
      intent.getAutocomplete();
      this.service.setAutocomplete(intent.getAutocomplete());
    }
    if (intent instanceof SearchIntent) {
      this.service.onPlaceChanged();
    }
  }
}
