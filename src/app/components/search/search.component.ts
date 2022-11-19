import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { Intent } from 'src/app/models/Intent';
import { PlacesService } from 'src/app/service/places.service';
import { InitialIntent } from './InitialIntent';
import { SearchIntent } from './SearchIntent';
//import { GoogleMap, MapGeocoder } from '@angular/google-maps';
import { SearchPresenter } from './SearchPresenter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [{ provide: SearchPresenter, useClass: SearchPresenter }],
})
export class SearchComponent implements OnInit {
  constructor(
    private searchFormBuilder: FormBuilder,
    private presenter: SearchPresenter
  ) {
    //this.autocomplete.addListener('place_changed', this.onPlaceChanged);
    // this.map = new google.maps.Map(
    //   document.getElementById('map') as HTMLElement
    // );
  }

  ngOnInit(): void {
    //initial intent /// simple initialization
    //this.autocomplete.addListener('place_changed', this.onPlaceChanged());
    //this.autocomplete.addListener('place_changed', this.placeChange);
    let intent = new InitialIntent();
    this.presenter.onIntent(intent);
  }

  searchForm = this.searchFormBuilder.group({
    city: [''],
  });

  onSearchIntent() {
    let intent = new SearchIntent();
    this.presenter.onIntent(intent);
  }
}
