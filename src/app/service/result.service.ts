import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Intent } from '../models/Intent';
import { LogInPreview } from '../models/LogInPreview';
import { AttractionService } from './attraction.service';
import { UserService } from './user.service';
import { CreateAccountIntent } from '../components/create-account-dialog/CreateAccountIntent';
import { concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { LogInIntent } from '../components/login-dialog/LogInIntent';
import { AddToAttractionListIntent } from '../components/home/AddToAttractionListIntent';
import { LogOutIntent } from '../components/dashboard/LogOutIntent';
import { RemoveAttractionIntent } from '../components/attraction-list-dialog/RemoveAttractionIntent';
import { Attraction } from '../models/Attraction';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  state: BehaviorSubject<LogInPreview>;
  //helper: Subject<any> = new Subject<any>();
  isLoggedIn: boolean = false;
  id: string = '';
  username: string = '';
  attractions: Attraction[] = [];

  private subscription: Subscription = new Subscription();
  constructor(
    private userService: UserService,
    private attractionService: AttractionService
  ) {
    console.log('Result presenter/service');
    console.log(localStorage);
    //localStorage.clear();
    if (localStorage.getItem('isLoggedIn') == null) {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = JSON.parse(
        localStorage.getItem('isLoggedIn') as string
      ) as boolean;
    }
    // this.id = localStorage.getItem('id') as string;
    // this.username = localStorage.getItem('username') as string;
    // if (localStorage.getItem('attractions') != null) {
    //   this.attractions = JSON.parse(
    //     localStorage.getItem('attractions') as string
    //   ) as Attraction[];
    // } else {
    //   this.attractions = [];
    // }
    this.state = new BehaviorSubject({
      isLoggedIn: this.isLoggedIn,
      account: {
        id: JSON.parse(localStorage.getItem('id') as string),
        username: JSON.parse(localStorage.getItem('username') as string),
        attractions: JSON.parse(localStorage.getItem('attractions') as string),
      },
    } as LogInPreview);
    console.log(this.state);
    console.log(localStorage);
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
                  localStorage.setItem('isLoggedIn', JSON.stringify(true));
                  localStorage.setItem(
                    'id',
                    JSON.stringify(accountView.id as string)
                  );
                  localStorage.setItem(
                    'username',
                    JSON.stringify(accountView.username as string)
                  );
                  localStorage.setItem(
                    'attractions',
                    JSON.stringify(accountView.attractions)
                  );

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
      console.log(localStorage);
    }

    if (intent instanceof LogInIntent) {
      this.subscription = this.userService
        .login(intent.getUsername(), intent.getPassword())
        .pipe(
          mergeMap((accountRes) =>
            this.attractionService.getAttractions().pipe(
              map((attractionRes) => {
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                localStorage.setItem('id', JSON.stringify(accountRes.id));
                localStorage.setItem(
                  'username',
                  JSON.stringify(accountRes.username)
                );
                localStorage.setItem(
                  'attractions',
                  JSON.stringify(attractionRes.attractions)
                );
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
      console.log(localStorage);
    }

    if (intent instanceof AddToAttractionListIntent) {
      this.attractionService
        .addAttraction(
          intent.getName(),
          intent.getRating(),
          intent.getReview(),
          intent.getAddress(),
          intent.getPhotoUrl()
        )
        .pipe(tap(() => console.log(this.state)))
        .subscribe();
      console.log(localStorage);
    }

    if (intent instanceof LogOutIntent) {
      this.userService.logout();
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
      localStorage.setItem('id', JSON.stringify(''));
      localStorage.setItem('username', JSON.stringify(''));
      localStorage.setItem('attractions', JSON.stringify([]));
      this.state.next({
        isLoggedIn: false,
        account: { id: '', username: '', attractions: [] },
      });
      this.subscription.unsubscribe();
      console.log(localStorage);
    }

    if (intent instanceof RemoveAttractionIntent) {
      console.log('from result service');

      this.attractionService
        .removeAttraction(intent.getName(), intent.getAddress())
        .pipe(tap(() => console.log(this.state)))
        .subscribe();
      console.log(localStorage);
    }

    // if(intent instanceof GetAttractionsIntent){
    //   this.attractionService.getAttractions().subscribe();
    // }
  }

  onViewDetach() {}
}
