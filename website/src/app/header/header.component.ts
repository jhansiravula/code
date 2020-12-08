import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import {Location} from '@angular/common';
import { NavigationService } from "../navigation.service";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  brands: any[];



  constructor(private router: Router,
              private apiService: ProductsService, private _location: Location, private navigation: NavigationService) { }

  ngOnInit() {
    this.getBrands();
  }

  getBrands() {
    this.apiService.getBrands().subscribe((data: any) => {
      this.brands = data.data;
      console.log(this.brands);
    });
  }
  clickBrand(brandName, brandId) {
    localStorage.removeItem('categoryIndex');
    this.router.navigate([`/productList/${brandId}`]);

  }
  backClicked() {
    this._location.back();
  }
  backWithLocation() {
    this._location.back();
  }

  backWithNavigation() {
    this.navigation.back();
  }
}


