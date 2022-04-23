import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrls: ['./create-account-dialog.component.css'],
})
export class CreateAccountDialogComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private formBuilder: FormBuilder) {}

  createAccountForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: ['', Validators.email],
    username: [''],
    password: [
      '',
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$'
      ),
    ],
  });
}
