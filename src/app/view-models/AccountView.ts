import { Attraction } from '../models/Attraction';

export interface AccountView {
  id: string;
  username: string;
  attractions: Attraction[];
}
