import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Intent } from 'src/app/models/Intent';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.css'],
})
export class CreateAccountDialogComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private userService: UserService,
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
      // Validators.pattern(
      //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$'
      // ),
    ],
  });

  closeDialog() {
    this.dialogRef.close;
  }

  onCreateUserIntent() {
    let firstName = this.createAccountForm.get('firstName')?.value;
    let lastName = this.createAccountForm.get('lastName')?.value;
    let email = this.createAccountForm.get('email')?.value;
    let username = this.createAccountForm.get('username')?.value;
    let password = this.createAccountForm.get('password')?.value;

    this.userService
      .createUser(firstName, lastName, email, username, password)
      .subscribe();
  }
}
