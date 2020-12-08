import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from '../products.service';
import { SubCategoriesComponent } from '../sub-categories/sub-categories.component';
import { Router, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';
// import { deflateRawSync } from 'zlib';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  brandId: any;
  categoryId: any;
  subcategoryId: any;
  products = [];
  categories = [];
  subCategories = [];
  showProducts: boolean = false;
  brands = [];
  selectedCategoryName: string;
  brandName: any;

  constructor(private apiService: ProductsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe((parms) => {
      console.log(parms);
      // this.getProduct(parms.subcategoryId, parms.categoryId, parms.brandId);
      this.getCategories(parms.brandId);
      // this.getSubcategory(parms.brandId, parms.categoryId);
      // this.clickSubCategory(parms.subcategoryId, parms.categoryId, parms.brandId);
      this.getBrands(parms.brandId);
      this.brandId = parms.brandId;
      this.brandName = parms.brandName;
    });
    window.scrollTo(0,0);
  }

  ngOnInit() {

  }

  // @HostListener('window:popstate', ['$event'])
  // onPopState() {
  //   console.log('Back button pressed');
  //   this.router.navigate([`/home`]);
  // }

//   @HostListener('window:popstate', ['$event'])
// onBrowserBackBtnClose(event: Event) {
//     console.log('back button pressed');
//     event.preventDefault(); 
//     this.router.navigate(['/home'],  {replaceUrl:true});
// }

  getBrands(brandId) {
    this.apiService.getBrand(brandId).subscribe((data: any) => {
      this.brands = data.data;
    })
  }

  getProduct(subcategoryId, categoryId, brandId) {
    console.log('ID: ', subcategoryId);
    this.apiService.getProducts(subcategoryId, categoryId, brandId).subscribe((data: any) => {
      this.products = data.data;
      console.log('Response:', data);
    });
  }

  getCategories(brandId) {
    this.apiService.getCategories(brandId).subscribe((data: any) => {
      this.categories = data.data;
      let index = parseInt(localStorage.getItem('categoryIndex'));
      if (!index) index = 0;
      this.getSubcategory(this.categories[index].categories_id, this.categories[index].brand_id, this.categories[index].categories_name, index);
    });
  }

  getSubcategory(categoryId, brandId, categoryName = '', index = null) {
    console.log(index);

    localStorage.setItem('categoryIndex', index);
    this.showProducts = false;
    this.selectedCategoryName = categoryName;
    this.apiService.getSubCategories(brandId, categoryId).subscribe((data: any) => {
      console.log('Response:', data);
      this.subCategories = data.data;
      this.categories.forEach(element => {
        let ele = document.getElementById(`category-${element.categories_id}`);
        ele.classList.remove('active');
      });
      let ele = document.getElementById(`category-${categoryId}`);
      ele.classList.add('active');
      if (this.subCategories.length == 0) {
        this.getProducts(categoryId, brandId);
      }
    });
  }



  clickSubCategory(subcategoryId, categoryId, brandId) {
    this.apiService.getProducts(subcategoryId, categoryId, brandId).subscribe((data: any) => {
      console.log('Response:', data);
      this.products = data.data;
      this.showProducts = true;
      // if (this.products.length > 0)  this.showSubCategory = true;

    });
  }

  getProducts(categoryId, brandId) {
    this.apiService.getProduct(categoryId, brandId).subscribe((data: any) => {
      console.log('Response:', data);
      this.products = data.data;
    });
  }


  clickProduct(productId, subcategoryId, categoryId, brandId) {
    this.showProducts = false;
    this.router.navigate([`/productSpec/${productId}/${subcategoryId}/${categoryId}/${brandId}`]);

  }

}

