import { Component, OnInit } from '@angular/core';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openCreateAccountDialog() {
    this.dialog.open(CreateAccountDialogComponent);
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent);
  }
}
