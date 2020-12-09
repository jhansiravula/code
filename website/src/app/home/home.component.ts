import { Component, OnInit, HostListener } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Location } from '@angular/common';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  brands: any[];
  constructor(private apiService: ProductsService,
    private router: Router,
    private location: PlatformLocation, ) {
    /*  location.onPopState((e)=>{
        console.log(location.href);
        this.router.navigate(['index.html']);
      })*/
     }


  ngOnInit() {
    this.getBrand();
    // window.location.reload(true);
    //window.history.back();

  }
  getBrand() {
    this.apiService.getBrands().subscribe((data: any) => {
      this.brands = data.data;
    });
  }


  clickBrand(brandId) {
    this.router.navigate([`/productList/${brandId}`]);
  }
  back(): void {
    this.router.navigate(['/index.html'])
  }



}
