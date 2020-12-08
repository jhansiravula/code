import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProductsComponent } from './products/products.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductSpecComponent } from './product-spec/product-spec.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  // {
  //   path: 'products/:brandName/:brandId',
  //   component: ProductsComponent
  // },
  {
    path: 'productList/:brandId',
    component: ProductListComponent
  },
  // {
  //   path: 'subCategories/:categoryId/:brandId',
  //   component: SubCategoriesComponent
  // },

  {
    path: 'productSpec/:productId/:subcategoryId/:categoryId/:brandId',
    component: ProductSpecComponent
  },
  // {
  //   path: 'productList/:brandId',
  //   component: ProductListComponent
  // },
  {
    path: 'careers',
    component: CareersComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
