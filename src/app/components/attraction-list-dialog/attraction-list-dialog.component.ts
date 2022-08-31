import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Attraction } from 'src/app/models/Attraction';
import { ResultService } from 'src/app/service/result.service';

@Component({
  selector: 'app-attraction-list-dialog',
  templateUrl: './attraction-list-dialog.component.html',
  styleUrls: ['./attraction-list-dialog.component.css'],
})
export class AttractionListDialogComponent implements OnInit {
  attractions!: Attraction[];
  isLoggedIn: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { attractions: Attraction[] },
    private service: ResultService,
    private dialogRef: MatDialogRef<AttractionListDialogComponent>
  ) {}

  ngOnInit(): void {
    this.service.state
      .pipe(
        tap((res) => {
          this.isLoggedIn = res.isLoggedIn;
          this.attractions = res.account.attractions;
        })
      )
      .subscribe();
  }
}
