import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
})
export class UploadsComponent implements OnInit {
  selectedFile!: File;
  files!: Observable<string[]>;
  url!: any;
  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {
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
        console.log(typeof this.url);
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
      .pipe(tap((res) => console.log(res)))
      .subscribe();
  }
}
