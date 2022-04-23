import { Intent } from 'src/app/models/Intent';

export class InitialIntent extends Intent {
  private map!: google.maps.Map;
  //private marker!: google.maps.Marker;
  private center!: google.maps.LatLngLiteral;

  constructor(map: google.maps.Map) {
    super();
    this.map = map;
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      this.map.setCenter(this.center);
      // this.map = new google.maps.Map(
      //   document.getElementById('map') as HTMLElement,
      //   {
      //     zoom: 12,
      //     center: this.center,
      //     mapTypeControl: false,
      //     panControl: false,
      //     zoomControl: false,
      //     streetViewControl: false,
      //   }
      // );

      new google.maps.Marker({
        position: this.center,
        animation: google.maps.Animation.DROP,
        map: this.map,
        title: 'Your location',
      });
      //this.marker.setMap(this.map);
    });
  }

  getMap() {
    return this.map;
  }
}
