import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url = 'http://localhost:8081/api/auth';

  constructor(private http:HttpClient) { }

  //Add Categories  

  addCategories(formData){  
    return this.http.post(`${this.url}/addcategories`,formData);
  }

  //Get Categories

  getcat(){
    return this.http.get(`${this.url}/getcategories`);
  }
  getcatById(id){
    return this.http.get(`${this.url}/getcategories/${id}`);
  }

  //Edit categories
  editcategories(formData){
    console.log(formData);
    return this.http.put(`${this.url}/updatecategories`,formData);
  }

  //Delete Categories
  deleteCategories(categories_id){
    return this.http.delete(`${this.url}/deletecategories/${categories_id}`);
  }
}
