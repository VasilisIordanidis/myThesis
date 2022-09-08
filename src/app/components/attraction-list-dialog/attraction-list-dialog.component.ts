import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Attraction } from 'src/app/models/Attraction';
import { LogInPreview } from 'src/app/models/LogInPreview';
import { ResultService } from 'src/app/service/result.service';
import { RemoveAttractionIntent } from './RemoveAttractionIntent';

@Component({
  selector: 'app-attraction-list-dialog',
  templateUrl: './attraction-list-dialog.component.html',
  styleUrls: ['./attraction-list-dialog.component.css'],
  //providers: [{ provide: ResultService, useClass: ResultService }],
})
export class AttractionListDialogComponent implements OnInit, OnDestroy {
  //attractions: any = [];
  isLoggedIn: boolean = false;
  state!: LogInPreview;
  constructor(
    //@Inject(MAT_DIALOG_DATA) public data: { attractions: Attraction[] },
    private service: ResultService,
    private dialogRef: MatDialogRef<AttractionListDialogComponent> //private subscription: Subscription
  ) {}

  ngOnInit(): void {
    this.service.state
      .pipe(
        tap((res) => {
          console.log('at init' + res);
          this.state = res;

          //this.attractions = res.account.attractions.values;
        })
        //take(1)
      )
      .subscribe();
    //console.log(this.state);
  }

  ngOnDestroy(): void {
    this.service.onViewDetach();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onRemoveAttraction(id: string, name: string, address: string) {
    let intent = new RemoveAttractionIntent(id, name, address);
    this.service.onIntent(intent);
  }
}
