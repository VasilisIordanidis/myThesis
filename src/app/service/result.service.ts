import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountView } from '../view-models/AccountView';
import { Intent } from '../models/Intent';
import { LogInPreview } from '../models/LogInPreview';
import { AttractionService } from './attraction.service';
import { UserService } from './user.service';
import { CreateAccountIntent } from '../components/create-account-dialog/CreateAccountIntent';
import { concatMap, mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  state: Subject<LogInPreview> = new Subject();
  isLoggedIn: boolean = false;
  constructor(
    private userService: UserService,
    private attractionService: AttractionService
  ) {}

  onIntent(intent: Intent) {
    if (intent instanceof CreateAccountIntent) {
      this.userService
        .createUser(
          intent.getFirstName(),
          intent.getLastName(),
          intent.getEmail(),
          intent.getUserName(),
          intent.getPassword()
          //intent.getId()
        )
        .pipe(
          concatMap(() =>
            this.userService
              .login(intent.getUserName(), intent.getPassword())
              .pipe(
                tap((accountView) => {
                  console.log(accountView);

                  this.state.next({
                    isLoggedIn: true,
                    accountView: accountView,
                  });
                })
              )
          )
        )
        .subscribe();
    }
  }
}
