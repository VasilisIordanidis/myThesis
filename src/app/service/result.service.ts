import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountView } from '../view-models/AccountView';
import { Intent } from '../models/Intent';
import { LogInPreview } from '../models/LogInPreview';
import { AttractionService } from './attraction.service';
import { UserService } from './user.service';
import { CreateAccountIntent } from '../components/create-account-dialog/CreateAccountIntent';
import { concatMap, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { LogInIntent } from '../components/login-dialog/LogInIntent';
import { AddToAttractionListIntent } from '../components/home/AddToAttractionListIntent';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  state: Subject<LogInPreview> = new Subject();
  //helper: Subject<any> = new Subject<any>();
  isLoggedIn: boolean = false;
  id: string = '';
  constructor(
    private userService: UserService,
    private attractionService: AttractionService
  ) {
    // this.helper
    //   .pipe(
    //     mergeMap(() =>
    //       this.attractionService
    //         .getAttractions(this.id)
    //         .pipe(takeUntil(this.helper))
    //     )
    //   )
    //   .subscribe();
  }

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
                    account: {
                      id: accountView.id,
                      username: accountView.username,
                      attractions: accountView.attractions,
                    },
                  });
                })
              )
          )
        )
        .subscribe();
    }

    if (intent instanceof LogInIntent) {
      this.userService
        .login(intent.getUsername(), intent.getPassword())
        .pipe(
          tap((accountView) => {
            console.log(accountView.username);

            this.state.next({
              isLoggedIn: true,
              account: {
                id: accountView.id,
                username: accountView.username,
                attractions: accountView.attractions,
              },
            });
          })
        )
        .subscribe();
    }

    if (intent instanceof AddToAttractionListIntent) {
      this.attractionService
        .addAttraction(
          this.id,
          intent.getName(),
          intent.getRating(),
          intent.getReview(),
          intent.getAddress(),
          intent.getPhotoUrl()
        )
        .subscribe();
    }
  }
}
