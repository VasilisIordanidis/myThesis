import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FileAsBase64 } from 'src/app/models/FileAsBase64';
import { LogInPreview } from 'src/app/models/LogInPreview';
import { ResultService } from 'src/app/service/result.service';

import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
})
export class UploadsComponent implements OnInit {
  selectedFile!: File;
  files!: Observable<FileAsBase64>;
  test!: FileAsBase64;
  url!: any;
  state!: LogInPreview;
  constructor(
    private uploadService: UploadService,
    private resultService: ResultService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resultService.state.pipe(tap((res) => (this.state = res))).subscribe();
    if (!this.state.isLoggedIn) {
      this.router.navigateByUrl('');
    }
    this.files = this.uploadService.getFiles();
  }

  onFileSelected(event: any) {
    if (
      event.target.files[0].type.match('image/*') ||
      event.target.files[0].type.match('video/*')
    ) {
      this.selectedFile = event.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(this.url);
      };
      reader.onerror = (event: any) => {
        console.log('File could not be read: ' + event.target.error.code);
      };
      reader.readAsDataURL(<Blob>event.target.files[0]);
    } else {
      window.alert('Only images or videos are allowed');
    }
  }

  onUpload() {
    if (this.selectedFile != null && this.selectedFile != undefined) {
      console.log(this.selectedFile);
      this.uploadService.upload(this.url).subscribe();
    } else {
      window.alert('Something went wrong please try again');
    }
  }
  get() {
    this.uploadService
      .getFiles()
      .pipe(
        tap((res) => {
          this.test = res;
          console.log(res.set[0].file);
        })
      )
      .subscribe();
  }
}
