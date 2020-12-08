import { Routes } from '@angular/router';


import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { DetailsComponent} from './details/details.component';
import { AuthGuards } from '../Guards/auth.guards';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { SpecificationsComponent } from './specifications/specifications.component';

export const ComponentsRoutes: Routes = [
  {
    path: '',
    children: [
     
      {
        path: 'brands',
        component: BrandsComponent,   
        data: {
          title: 'Brands',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'Brands' }
          ]
        }
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      
        data: {
          title: 'Product-Categories',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'categories' }
          ]
        }
      },
      {
        path: 'subcategories',
        component: SubCategoriesComponent,
        data: {
          title: 'Product-SubCategories',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'subcategories' }
          ]
        }
      },
      
      {
        path: 'details',
        component: DetailsComponent,
        data: {
          title: 'Product',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'details' }
          ]
        }
      },
      // {
      //   path: 'specifications',
      //   component: SpecificationsComponent,
      //   data: {
      //     title: 'Product-Details',
      //     urls: [
      //       { title: 'Dashboard', url: '/dashboard' },
      //       { title: 'ngComponent' },
      //       { title: 'details' }
      //     ]
      //   }
      // },
      {
        path:'contactdetails',
        component: ContactDetailsComponent,
        data: {
          title: 'Contact-Details',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'ngComponent' },
            { title: 'contact-details' }
          ]
        }
      }
    ],
    canActivate: [AuthGuards]
  }
];
