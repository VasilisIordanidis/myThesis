import { Injectable } from '@angular/core';
import { Intent } from 'src/app/models/Intent';
import { InitialIntent } from './InitialIntent';
import { Subject } from 'rxjs';
import { PlacesService } from 'src/app/service/places.service';
@Injectable({
  providedIn: 'root',
})
export class HomePresenter {
  //   private map = {} as google.maps.Map;
  //   private mapCenter = {} as google.maps.LatLngLiteral;
  //public state: Subject<google.maps.Map> = new Subject<google.maps.Map>();
  constructor(private service: PlacesService) {
    console.log('Home Presenter');
  }

  onIntent(intent: Intent) {
    if (intent instanceof InitialIntent) {
      this.service.onInitialMapIntent(intent.getMap());
    }
  }
}
