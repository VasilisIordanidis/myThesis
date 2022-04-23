import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { HomePresenter } from './HomePresenter';
import { InitialIntent } from './InitialIntent';
import { tap } from 'rxjs/operators';
import { PlacesService } from 'src/app/service/places.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: HomePresenter, useClass: HomePresenter }],
})
export class HomeComponent implements OnInit {
  // mapCenter!: google.maps.LatLngLiteral;
  // mapOptions: google.maps.MapOptions = {
  //   //center: this.mapCenter,
  //   mapTypeId: 'hybrid',
  //   disableDoubleClickZoom: true,
  //   maxZoom: 15,
  //   minZoom: 8,
  // };
  gmap!: any;

  constructor(
    private presenter: HomePresenter,
    private service: PlacesService
  ) {}

  ngOnInit(): void {
    this.gmap = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 12,
        //center: this.center,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
      }
    );
    let intent = new InitialIntent(this.gmap);
    this.presenter.onIntent(intent);
  }
}
