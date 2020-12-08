import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categories: any[];
  brands: any[];
  subcategories: any;
  showCategory: boolean = false;
  showSubCategory: boolean;
  brandName: any;
  categoryName: any;

  constructor(private apiService: ProductsService,
              private router: Router,
              private route: ActivatedRoute) {
      this.route.params.subscribe((parms) => {
        console.log(parms);
        this.showCategory = false;
        this.showSubCategory = false;
        this.clickBrand(parms.brandId);
        this.brandName = parms.brandName;
        this.categoryName = parms.categoryName;
       
      });
    }

  ngOnInit() {
  }


  clickBrand(brandId) {
    this.apiService.getCategories(brandId).subscribe((data: any) => {
      console.log('Response:', data);
      this.categories = data.data;
    });
  }

  // clickCategory(categoryId) {
  //   this.apiService.getSubCategories(categoryId).subscribe((data: any) => {
  //     console.log('Response:', data);
  //     this.subcategories = data.data;
  //   //  if(this.subcategories.length >0) this.showCategory = true;
  //   });
  // }

  clickCategory( brandId, categoryId ) {
    console.log(brandId);
    console.log(categoryId);
   // console.log(categoryName);
    this.router.navigate([`/subCategories/${brandId}/${categoryId}`]);
  }
}
