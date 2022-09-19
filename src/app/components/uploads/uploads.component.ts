import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
})
export class UploadsComponent implements OnInit {
  selectedFile!: File;
  constructor(private uploadService: UploadService) {}

  ngOnInit(): void {}
  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  onUpload() {
    if (this.selectedFile != null) {
      this.uploadService.upload(this.selectedFile).subscribe();
    }
  }
}
