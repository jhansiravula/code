import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuards } from '../Guards/auth.guards';
import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  // {
  //   path: '', component: HomePageComponent,
  //   children: [
  //     {
  //       path: '', component: HomePageComponent,
  //       data: {
  //         title: 'Home Page',
  //         urls: [
  //           { title: 'Dashboard', url: '/dashboard' },
  //           { title: 'Home Page' }
  //         ]
  //       }
  //     }
  //   ],
  //   // canActivate: [AuthGuards]
  // }
  {
    path: '',
    data: {
      title: 'Home Page',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Home Page' }
      ]
    },
    component: HomePageComponent,
    canActivate: [AuthGuards]
  }
];

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [HomePageComponent],
  entryComponents: [
    HomePageComponent
  ]
})
export class HomeModule { }
