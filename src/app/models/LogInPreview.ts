import { AccountView } from '../view-models/AccountView';
import { Attraction } from './Attraction';

export interface LogInPreview {
  isLoggedIn: boolean;
  account: AccountView;
}
