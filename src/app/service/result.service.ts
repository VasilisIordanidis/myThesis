import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { AccountView } from '../view-models/AccountView';
import { Intent } from '../models/Intent';
import { LogInPreview } from '../models/LogInPreview';
import { AttractionService } from './attraction.service';
import { UserService } from './user.service';
import { CreateAccountIntent } from '../components/create-account-dialog/CreateAccountIntent';
import { concatMap, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { LogInIntent } from '../components/login-dialog/LogInIntent';
import { AddToAttractionListIntent } from '../components/home/AddToAttractionListIntent';
import { LogOutIntent } from '../components/dashboard/LogOutIntent';
import { RemoveAttractionIntent } from '../components/attraction-list-dialog/RemoveAttractionIntent';
import { Attraction } from '../models/Attraction';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  state: BehaviorSubject<LogInPreview> = new BehaviorSubject({
    isLoggedIn: false,
    account: {
      id: '',
      username: '',
      attractions: [],
    },
  } as LogInPreview);
  //helper: Subject<any> = new Subject<any>();
  isLoggedIn: boolean = false;
  id: string = '';
  username: string = '';
  private subscription: Subscription = new Subscription();
  constructor(
    private userService: UserService,
    private attractionService: AttractionService
  ) {
    console.log('Result presenter/service');

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
      this.subscription = this.userService
        .login(intent.getUsername(), intent.getPassword())
        .pipe(
          // tap((accountView) => {
          //   this.id = accountView.id;
          //   this.username = accountView.username;
          //   this.state.next({
          //     isLoggedIn: true,
          //     account: {
          //       id: accountView.id,
          //       username: accountView.username,
          //       attractions: accountView.attractions,
          //     },
          //   });
          //})
          mergeMap((accountRes) =>
            this.attractionService.getAttractions().pipe(
              map((attractionRes) => {
                this.id = accountRes.id;
                this.username = accountRes.username;
                this.state.next({
                  isLoggedIn: true,
                  account: {
                    id: accountRes.id,
                    username: accountRes.username,
                    attractions: attractionRes.attractions,
                  },
                });
              })
            )
          )
        )
        .subscribe();
    }

    if (intent instanceof AddToAttractionListIntent) {
      this.attractionService
        .addAttraction(
          //this.id,
          intent.getName(),
          intent.getRating(),
          intent.getReview(),
          intent.getAddress(),
          intent.getPhotoUrl()
        )
        // .pipe(
        //   map(() => {
        //     this.attractionService
        //       .getAttractions(this.id)
        //       .pipe(
        //         tap((res) =>
        //           this.state.next({
        //             isLoggedIn: true,
        //             account: {
        //               id: this.id,
        //               username: this.username,
        //               attractions: res,
        //             },
        //           })
        //         )
        //       )
        //       .subscribe();
        //  })
        //)
        .subscribe();
    }

    if (intent instanceof LogOutIntent) {
      this.userService.logout();
      this.state.next({
        isLoggedIn: false,
        account: { id: '', username: '', attractions: [] },
      });
    }

    if (intent instanceof RemoveAttractionIntent) {
      console.log('from result service');

      this.attractionService
        .removeAttraction(intent.getName(), intent.getAddress())
        .subscribe();
    }
  }

  onViewDetach() {
    this.subscription.unsubscribe();
  }
}
