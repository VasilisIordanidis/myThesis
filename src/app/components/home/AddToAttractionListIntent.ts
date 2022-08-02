import { Intent } from 'src/app/models/Intent';
import { PlaceResult } from 'src/app/view-models/PlaceResults';

export class AddToAttractionListIntent extends Intent {
  private name!: string;
  private address!: string;
  private photoUrl!: string[];
  private rating!: number;
  private review!: number;

  constructor(
    name: string,
    address: string,
    photoUrl: string[],
    rating: number,
    review: number
  ) {
    super();
    this.name = name;
    this.address = address;
    this.photoUrl = photoUrl;
    this.rating = rating;
    this.review = review;
  }

  getName() {
    return this.name;
  }

  getAddress() {
    return this.address;
  }

  getPhotoUrl() {
    return this.photoUrl;
  }

  getRating() {
    return this.rating;
  }

  getReview() {
    return this.review;
  }
}
