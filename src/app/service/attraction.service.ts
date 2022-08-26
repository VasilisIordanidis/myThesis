import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { Attraction } from '../models/Attraction';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {
  private apiUrl = '/api/user';
  private subject = new Subject<any>();
  private static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
  constructor(private http: HttpClient) {}

  addAttraction(
    id: string,
    name: string,
    rating: number,
    totalReviews: number,
    address: string,
    imgUrl: string
  ) {
    const body = { id, name, rating, totalReviews, address, imgUrl };
    const url = `${this.apiUrl}/${id}/attractions`;
    return this.http.post(url, body).pipe(
      //tap(() => this.subject.next()),
      catchError(AttractionService.handleError)
    );
  }

  removeAttraction(id: string, name: string, address: string) {
    let params = new HttpParams()
      .set('id', id)
      .set('name', name)
      .set('address', address);
    let options = { params: params };
    const url = `${this.apiUrl}/${id}/attractions`;
    return this.http.delete(url).pipe(
      //tap(() => this.subject.next()),
      catchError(AttractionService.handleError)
    );
  }

  getAttractions(id: string): Observable<Attraction[]> {
    const url = `${this.apiUrl}/${id}/attractions`;
    let a = this.http
      .get<Attraction[]>(url)
      .pipe(catchError(AttractionService.handleError));
    //let b = this.subject.pipe(mergeMap(() => a));
    //return merge(a, b);
    return a;
  }
}
