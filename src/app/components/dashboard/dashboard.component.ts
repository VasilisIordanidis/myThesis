import { Component, OnInit } from '@angular/core';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ResultService } from 'src/app/service/result.service';
import { LogInPreview } from 'src/app/models/LogInPreview';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AccountView } from 'src/app/view-models/AccountView';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private resultService: ResultService
  ) {}
  login: boolean = false;
  username!: string;
  ngOnInit(): void {
    this.resultService.state
      .pipe(
        tap((value) => {
          this.login = value.isLoggedIn;
          this.username = value.account.username;
          //console.log(value);
        })
      )
      .subscribe();
  }

  openCreateAccountDialog() {
    this.dialog.open(CreateAccountDialogComponent);
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  onLogOut() {
    this.login = false;
  }
}
