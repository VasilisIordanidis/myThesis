import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Attraction } from 'src/app/models/Attraction';
import { LogInPreview } from 'src/app/models/LogInPreview';
import { ResultService } from 'src/app/service/result.service';

@Component({
  selector: 'app-attraction-list-dialog',
  templateUrl: './attraction-list-dialog.component.html',
  styleUrls: ['./attraction-list-dialog.component.css'],
  //providers: [{ provide: ResultService, useClass: ResultService }],
})
export class AttractionListDialogComponent implements OnInit, OnDestroy {
  attractions!: Attraction[];
  isLoggedIn: boolean = false;
  state = {} as LogInPreview;
  constructor(
    //@Inject(MAT_DIALOG_DATA) public data: { attractions: Attraction[] },
    private service: ResultService,
    private dialogRef: MatDialogRef<AttractionListDialogComponent> //private subscription: Subscription
  ) {}

  ngOnInit(): void {
    console.log('hello from dialog');

    this.service.state
      .pipe(
        tap((res) => {
          //console.log(res);
          this.state = res;
          console.log(this.state);
        }),
        take(1)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.service.onViewDetach();
  }

  closeDialog() {
    //console.log(this.state);

    this.dialogRef.close();
  }
}
