import { HostListener } from '@angular/core';
import { Directive } from '@angular/core';
import { NavigationService } from './navigation.service';


@Directive({
  selector: '[appBackbutton]'
})
export class BackbuttonDirective {

  constructor(private navigation: NavigationService) { }

  @HostListener('click')
  onClick(): void {
    this.navigation.back();
  }
}
