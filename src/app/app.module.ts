import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

// import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SavedComponent } from './components/saved/saved.component';
import { CreateAccountDialogComponent } from './components/create-account-dialog/create-account-dialog.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { PlacesService } from './service/places.service';
import { SearchComponent } from './components/search/search.component';
import { UserService } from './service/user.service';
import { AttractionService } from './service/attraction.service';
import { AttractionListDialogComponent } from './components/attraction-list-dialog/attraction-list-dialog.component';
import { ResultService } from './service/result.service';
import { BtnDirective } from './components/home/btn.directive';
import { UploadsComponent } from './components/uploads/uploads.component';
import { UploadService } from './service/upload.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    SavedComponent,
    CreateAccountDialogComponent,
    LoginDialogComponent,
    SearchComponent,
    AttractionListDialogComponent,
    BtnDirective,
    UploadsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    GoogleMapsModule,
    MatDividerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSlideToggleModule,
  ],
  providers: [
    PlacesService,
    UserService,
    AttractionService,
    ResultService,
    UploadService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
