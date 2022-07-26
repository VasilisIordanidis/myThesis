import { Attraction } from './Attraction';
import { AccountView } from '../view-models/AccountView';

export interface LogInPreview {
  isLoggedIn: boolean;
  accountView: AccountView;
}
