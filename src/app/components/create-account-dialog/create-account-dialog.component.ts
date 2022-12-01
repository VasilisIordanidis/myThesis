import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResultService } from 'src/app/service/result.service';
import { CreateAccountIntent } from './CreateAccountIntent';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.scss'],
})
export class CreateAccountDialogComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private resultService: ResultService,
    private dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  createAccountForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', Validators.email],
    username: [''],
    password: [
      '',
      Validators.pattern(
        //'^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d]{8,}$'
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W|_).{8,}$'
      ),
    ],
  });

  closeDialog() {
    this.dialogRef.close();
  }

  onCreateUserIntent() {
    let firstName = this.createAccountForm.get('firstName')?.value;
    let lastName = this.createAccountForm.get('lastName')?.value;
    let email = this.createAccountForm.get('email')?.value;
    let username = this.createAccountForm.get('username')?.value;
    let password = this.createAccountForm.get('password')?.value;
    let intent = new CreateAccountIntent(
      firstName,
      lastName,
      email,
      username,
      password
    );
    this.resultService.onIntent(intent);
    this.dialogRef.close();
  }
}
