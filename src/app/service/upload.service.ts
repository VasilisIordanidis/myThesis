import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FileAsBase64 } from '../models/FileAsBase64';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private apiUrl!: string;
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

  upload(file: String) {
    const body = { data: file };
    return this.http
      .post(this.apiUrl, body)
      .pipe(catchError(UploadService.handleError));
  }

  getFiles(): Observable<FileAsBase64> {
    return this.http
      .get<FileAsBase64>(this.apiUrl)
      .pipe(catchError(UploadService.handleError));
  }
}
