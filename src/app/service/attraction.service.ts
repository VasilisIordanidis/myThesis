import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { UserService } from './user.service';

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
  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.accountId
      .pipe(
        tap((res) => {
          this.apiUrl = `/api/user/${res}/attractions`;
        })
      )
      .subscribe();
    console.log('Attraction service');
  }

  addAttraction(
    name: string,
    rating: number,
    totalReviews: number,
    address: string,
    imgUrl: string
  ) {
    const body = { name, rating, totalReviews, address, imgUrl };
    return this.http.post(this.apiUrl, body).pipe(
      tap(() => this.subject.next()),
      catchError(AttractionService.handleError)
    );
  }

  removeAttraction(name: string, address: string) {
    const options = { body: { name: name, address: address } };
    return this.http.delete(this.apiUrl, options).pipe(
      tap(() => this.subject.next()),
      catchError(AttractionService.handleError)
    );
  }

  getAttractions(): Observable<any> {
    let a = this.http.get<any>(this.apiUrl);
    let b = this.subject.pipe(mergeMap(() => a));
    return merge(a, b).pipe(
      tap((res) => {
        localStorage.setItem('attractions', JSON.stringify(res.attractions));
      }),
      catchError(AttractionService.handleError)
    );
  }
}
