import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-spec',
  templateUrl: './product-spec.component.html',
  styleUrls: ['./product-spec.component.css']
})
export class ProductSpecComponent implements OnInit {

  brandId: any;
  categoryId: any;
  subcategoryId: any;
  productId: any;
  specifications: any[];
  products: any;
  brands: any[];

  constructor(private apiService: ProductsService,
              private router: Router,
              private route: ActivatedRoute) {
                this.route.params.subscribe((parms) => {
                  console.log(parms);
                 this.getSpec(parms.productId);
                 this.brandId = parms.brandId;
                 if(!parms.subcategoryId) this.getWithOutSub(parms.productId);
                });
                window.scrollTo(0,0);
              }

  ngOnInit() {
  }
  


  // getSpec(productId, subcategoryId, categoryId, brandId){
  //   this.apiService.getProductById(productId, subcategoryId, categoryId, brandId).subscribe((data: any) => {
  //     console.log('Response:', data);
  //     this.products = data.data;
  //   });
  // }

  getWithOutSub(productId) {
    this.apiService.getProductDetails(productId ).subscribe((data: any) =>{
      console.log('Response:', data);
      this.products = data.data;
    });
  }

  getSpec(productId){
    this.apiService.getProductDetails(productId ).subscribe((data: any) =>{
      console.log('Response:', data);
      this.products = data.data;
    });
  }


  getDesc(desc) {

    let divEle = document.getElementById('product_desc');
    divEle.innerHTML = desc;
    console.log(divEle);
    return '';
  }

  clickBackWord(){
    let brandId= this.brandId;
    console.log(brandId);
    this.router.navigate([`/productList/${brandId}`]);

  }


}
