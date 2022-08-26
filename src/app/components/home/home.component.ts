import { Component, OnInit } from '@angular/core';
import { HomePresenter } from './HomePresenter';
import { InitialIntent } from './InitialIntent';
import { tap } from 'rxjs/operators';
import { PlacesService } from 'src/app/service/places.service';
import { PlaceResult } from 'src/app/view-models/PlaceResults';
import { AttractionService } from 'src/app/service/attraction.service';
import { ResultService } from 'src/app/service/result.service';
import { AddToAttractionListIntent } from './AddToAttractionListIntent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: HomePresenter, useClass: HomePresenter }],
})
export class HomeComponent implements OnInit {
  gmap!: any;
  attractions!: PlaceResult[];
  isLoggedIn!: boolean;
  id!: string;
  constructor(
    private presenter: HomePresenter,
    private service: PlacesService,
    private resultService: ResultService
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

    this.service.state
      .asObservable()
      .pipe(tap((res) => (this.attractions = res)))
      .subscribe();

    this.resultService.state
      .asObservable()
      .pipe(
        tap((res) => {
          //console.log(res);

          this.isLoggedIn = res.isLoggedIn;
          this.id = res.account.id;
        })
      )
      .subscribe();
  }

  onAddToAttractionList(place: PlaceResult) {
    if (this.isLoggedIn == true) {
      //console.log(this.isLoggedIn);
      console.log(place.photos[0]);
      //place.photos;
      let intent = new AddToAttractionListIntent(
        place.name,
        place.address,
        place.photos[0],
        place.rating,
        place.total_reviews
      );
      this.resultService.onIntent(intent);
    } else {
      window.alert('Login first to save attractions');
    }
  }
}
