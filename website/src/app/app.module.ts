import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ProductsComponent } from './products/products.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsService } from './products.service';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductSpecComponent } from './product-spec/product-spec.component';
import { HostListener } from '@angular/core';
import { BackbuttonDirective } from './backbutton.directive';
import { NavigationService } from "./navigation.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    GalleryComponent,
    ProductsComponent,
    CareersComponent,
    ContactComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    ProductListComponent,
    ProductSpecComponent,
    BackbuttonDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
