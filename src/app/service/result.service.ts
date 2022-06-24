import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AccountView } from '../models/AccountView';
import { AttractionService } from './attraction.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  state: Subject<AccountView> = new Subject();
  constructor(
    private userService: UserService,
    private attractionService: AttractionService
  ) {}

  onCreateIntent() {}
}
