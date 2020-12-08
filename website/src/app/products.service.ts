import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  getBrands() {
    return this.http.get(`${this.url}/getbrands`);
    }
    getBrand(brandId) {
      console.log('brandid', brandId);
      return this.http.get(`${this.url}/getbrandsid/${brandId}`);
      }


    // Get Categories
 getCategories(brandId) {
  return this.http.get(`${this.url}/getcategories/${brandId}`);
}

getCategoriesList() {
return this.http.get(`${this.url}/getcategories`);
}

 // Get Sub-Categories
 getSubCategories( brandId, categoryId) {
  return this.http.get(`${this.url}/getsubcategories/${categoryId}/${ brandId}`);
}

getSubCategoriesList() {
  return this.http.get(`${this.url}/getsubcategories`);
}

// Get products
getProductList() {
  return this.http.get(`${this.url}/getproductlist`);
}

getProducts(subcategoryId, categoryId, brandId) {
  return this.http.get(`${this.url}/getproductlist/${subcategoryId}/${categoryId}/${brandId}`);
}

getProduct( categoryId, brandId){
  return this.http.get(`${this.url}/getproducts/${categoryId}/${brandId}`);
}

getProductById(productId, subcategoryId, categoryId, brandId){
  return this.http.get(`${this.url}/getproductlist/${productId}/${subcategoryId}/${categoryId}/${brandId}`);
}

getProductDetails(productId ) {
  return this.http.get(`${this.url}/getdetail/${productId}`);
}
// Get Products Specifications

getProductSpec(productId, subcategoryId, categoryId, brandId) {
  return this.http.get(`${this.url}/getspec/${productId}/${subcategoryId}/${categoryId}/${brandId}`);
}


//contact details

// addContactDetails(obj) {
//   return this.http.post(`${this.url}/addcontactdetails`, obj);
// }

sendContact(obj){
  return this.http.post(`${this.url}/sendtomail`, obj);
}
}


