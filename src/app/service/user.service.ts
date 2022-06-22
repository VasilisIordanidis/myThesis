import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountView } from '../models/AccountView';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  createUser(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
  ) {
    const body = { firstName, lastName, email, username, password };
    return this.http
      .post(this.apiUrl, body)
      .pipe(catchError(UserService.handleError));
  }

  login(username: string, password: string): Observable<AccountView> {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http
      .get<AccountView>(this.apiUrl, { params })
      .pipe(catchError(UserService.handleError));
  }
}
