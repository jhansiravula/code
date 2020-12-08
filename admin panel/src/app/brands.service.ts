import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  url = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

//Add Brands
  // addBrand(info) {
  //   console.log(info);
  //   return this.http.post(`${this.url}/addbrands`, info);
  // }
    addBrand(formData) {
    return this.http.post(`${this.url}/addbrands`,formData);
  }

 //Get Brands
   getBrands(){
   return this.http.get(`${this.url}/getbrands`);
   }

  //Edit Brands
  editBrand(formData){
    console.log(formData);
  return this.http.put(`${this.url}/updatebrands`,formData);
  }
  
  //Delete Brand
  deleteBrand(brand_id){
    return this.http.delete(`${this.url}/deletebrands/${brand_id}`);
  }
}
