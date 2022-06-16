import { Attraction } from './Attraction';

export interface Account {
  id: string;
  username: string;
  password: string;
  savedAttractions: Attraction[];
}
