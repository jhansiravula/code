import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuards } from './Guards/auth.guards';

export const Approutes: Routes = [

  // { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: "login", component: LoginComponent },
  // { path: "homepage", loadChildren: () => import('./homepage/home-page.module').then(m => m.HomeModule) },
  // { path: "component", loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule) },
  

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'homepage',
        loadChildren: './homepage/home-page.module#HomeModule'
      },
      {
        path: 'component',
        loadChildren: './component/component.module#ComponentsModule'
      },
    ],
    canActivate: [AuthGuards]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
