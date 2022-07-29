import { Attraction } from '../models/Attraction';

export interface AccountView {
  username: string;
  attractions: Attraction[];
}
