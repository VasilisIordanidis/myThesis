import { Attraction } from '../models/Attraction';

export interface AccountView {
  isLoggedIn: boolean;
  accountView: {
    username: string;
    attractionList: Attraction[];
  };
}
