import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AttractionService {
  private apiUrl = '/api/user';
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
    totalReview: number,
    address: string,
    imgUrl: string
  ) {
    const body = { id, name, rating, totalReview, address, imgUrl };
    const url = `${this.apiUrl}/user/${id}/attractions`;
    return this.http
      .post(url, body)
      .pipe(catchError(AttractionService.handleError));
  }

  removeAttraction(id: string, name: string, address: string) {
    let params = new HttpParams()
      .set('id', id)
      .set('name', name)
      .set('address', address);
    let options = { params: params };
    const url = `${this.apiUrl}/user/${id}/attractions`;
    return this.http
      .delete(url)
      .pipe(catchError(AttractionService.handleError));
  }
}
