import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()

  user: any;
  authToken: any;
  toggleSidebar = new EventEmitter<void>();

 
  constructor(public router: Router) {}

  logout() {
  localStorage.clear();
  this.router.navigate(['login']);
  }
}
