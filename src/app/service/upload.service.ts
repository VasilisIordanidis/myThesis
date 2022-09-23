import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
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
          this.apiUrl = `/api/user/${res}/uploads`;
        })
      )
      .subscribe();
  }

  upload(file: File) {
    if (file.type.match('image/*' || file.type.match('video/*'))) {
      console.log(true);
    } else {
      //console.log(false);
      window.alert('Only images and videos are supported');
    }
    //file.type == 'image';
    const body = { file };
    //return this.http.post(this.apiUrl, body);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
