import { Component, OnInit, Renderer2 } from '@angular/core';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ResultService } from 'src/app/service/result.service';
import { LogInPreview } from 'src/app/models/LogInPreview';
import { tap } from 'rxjs/operators';
import { LogOutIntent } from './LogOutIntent';
import { AttractionListDialogComponent } from '../attraction-list-dialog/attraction-list-dialog.component';
import { Router } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private resultService: ResultService,
    private router: Router,
    private renderer: Renderer2
  ) {}
  login: boolean = false;
  username!: string;
  url!: string;
  state!: LogInPreview;
  ngOnInit(): void {
    this.resultService.state
      .pipe(
        tap((value) => {
          this.login = value.isLoggedIn;
          this.username = value.account.username;
          this.state = value;
          this.url = `user/${value.account.id}/uploads`;
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
    let intent = new LogOutIntent();
    this.resultService.onIntent(intent);
    console.log(this.login);
    this.router.navigateByUrl('');
  }

  openAttractionListDialog() {
    this.dialog.open(AttractionListDialogComponent);
  }

  changeTheme(event: MatSlideToggleChange) {
    event.checked
      ? this.renderer.addClass(document.body, 'darkMode')
      : this.renderer.removeClass(document.body, 'darkMode');
  }
}
