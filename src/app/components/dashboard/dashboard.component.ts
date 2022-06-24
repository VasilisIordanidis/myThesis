import { Component, OnInit } from '@angular/core';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ResultService } from 'src/app/service/result.service';
import { AccountView } from 'src/app/models/AccountView';
import { Subject } from 'rxjs';

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
  state: Subject<AccountView> = new Subject();
  ngOnInit(): void {}

  openCreateAccountDialog() {
    this.dialog.open(CreateAccountDialogComponent);
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }
}
