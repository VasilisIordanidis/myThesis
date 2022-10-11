import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AccountView } from '../view-models/AccountView';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/user';
  accountId: BehaviorSubject<string>;
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
  constructor(private http: HttpClient) {
    console.log('User Service');
    this.accountId = new BehaviorSubject(
      JSON.parse(localStorage.getItem('id') as string)
    );
  }

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
    return this.http.get<AccountView>(this.apiUrl, { params }).pipe(
      tap((res) => {
        this.accountId.next(res.id);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('id', JSON.stringify(res.id as string));
        localStorage.setItem(
          'username',
          JSON.stringify(res.username as string)
        );
      }),
      catchError(UserService.handleError)
    );
  }

  logout() {
    this.accountId.next('');
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.setItem('id', JSON.stringify(''));
    localStorage.setItem('username', JSON.stringify(''));
    localStorage.setItem('attractions', JSON.stringify([]));
  }
}
