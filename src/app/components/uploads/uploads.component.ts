import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
})
export class UploadsComponent implements OnInit {
  selectedFile!: File;
  url!: any;
  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };
    reader.onerror = (event: any) => {
      console.log('File could not be read: ' + event.target.error.code);
    };
    reader.readAsDataURL(<Blob>event.target.files[0]);
  }
  onUpload() {
    if (this.selectedFile != null) {
      this.uploadService.upload(this.selectedFile);
    }
  }
}
