import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  url = 'http://localhost:8081/api/auth';

  constructor(private http:HttpClient) { }

  //Add Product Details
  addProductDetails(formData){
    console.log(formData);
    return this.http.post(`${this.url}/addproductlist`,formData);
  }

  //Get Product Details
  getProductDetails(){
    return this.http.get(`${this.url}/getproductlist`);
  }

  //Get product by id
  getProductById(id){
    return this.http.get(`${this.url}/getproductlist/${id}`);
  }

  //Edit Product Details
  editProductDetails(formData){
    return this.http.put(`${this.url}/updateproductlist`,formData);
  }

  //Delete
  deleteProductDetails(product_id){
    return this.http.delete(`${this.url}/deleteproductlist/${product_id}`);
  }
  getsubcatbyid(id){
    return this.http.get(`${this.url}/getsubcategories/${id}`);
  }
  getcatById(id){
    return this.http.get(`${this.url}/getcategories/${id}`);
  }
}
