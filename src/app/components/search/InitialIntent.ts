import { Intent } from 'src/app/models/Intent';

export class InitialIntent extends Intent {
  private autocomplete!: google.maps.places.Autocomplete;

  constructor() {
    super();
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
      {
        types: ['(cities)'],
        componentRestrictions: { country: 'GR' },
        fields: ['geometry'],
      }
    );
  }

  getAutocomplete() {
    return this.autocomplete;
  }
}
