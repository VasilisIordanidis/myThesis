import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterContentInit,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Attraction } from 'src/app/models/Attraction';

@Directive({
  selector: '[btn]',
})
export class BtnDirective implements OnChanges {
  @Input() itemList!: any;
  @Input() item!: any;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    let attractionFound = this.itemList.find(
      (attraction: any) =>
        attraction.name == this.item.name &&
        attraction.address == this.item.address
    );
    if (attractionFound) {
      this.renderer.setProperty(
        this.element.nativeElement,
        'innerHTML',
        'favorite'
      );
      this.renderer.setAttribute(this.element.nativeElement, 'style', 'warn');
      //break;
    } else {
      //this.btnValue = 'favourite_outline';
      this.renderer.setProperty(
        this.element.nativeElement,
        'innerHTML',
        'favorite_outline'
      );
    }
    // for (let attraction of this.itemList) {
    //   if (
    //     attraction.name == this.item.name &&
    //     attraction.address == this.item.address
    //   ) {
    //     this.renderer.setProperty(
    //       this.element.nativeElement,
    //       'innerHTML',
    //       'favorite'
    //     );
    //     this.renderer.setAttribute(this.element.nativeElement, 'style', 'warn');
    //     break;
    //   } else {
    //     //this.btnValue = 'favourite_outline';
    //     this.renderer.setProperty(
    //       this.element.nativeElement,
    //       'innerHTML',
    //       'favorite_outline'
    //     );
    //   }
    // }
  }
}
