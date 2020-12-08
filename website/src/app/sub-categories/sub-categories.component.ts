import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css']
})
export class SubCategoriesComponent implements OnInit {

  subCategories: any[];
  categoryName: any;
  brandName: any;
  brandId: any;
  categoryId: any;
  constructor(private apiService: ProductsService,
              private router: Router,
              private route: ActivatedRoute) {
                this.route.params.subscribe((parms) => {
                  console.log(parms);
                  this.getSubCat(parms.categoryId , parms.brandId);

                });
               }

  ngOnInit() {
  }

  getSubCat(brandId, categoryId) {
    console.log(brandId);
    console.log(categoryId);
    this.apiService.getSubCategories(brandId, categoryId).subscribe((data: any) => {
      this.subCategories = data.data;
      console.log('Response:', data);

    });
  }

 clickSubCategory( subcategoryId, categoryId, brandId) {
   this.router.navigate([`/productList/${subcategoryId}/${categoryId}/${brandId}`]);
 }
}
