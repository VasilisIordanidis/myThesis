import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResultService } from 'src/app/service/result.service';
import { LogInIntent } from './LogInIntent';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
})
export class LoginDialogComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private resultService: ResultService,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  ngOnInit(): void {}

  loginForm = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  closeDialog() {
    this.dialogRef.close();
  }

  login() {
    let username = this.loginForm.get('username')?.value;
    let password = this.loginForm.get('password')?.value;
    let intent = new LogInIntent(username, password);
    this.resultService.onIntent(intent);
    this.dialogRef.close();
  }
}
