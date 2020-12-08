import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  url = 'http://localhost:8081/api/auth';

  constructor(private http:HttpClient) { }


//Add sub-Categories
  addSubCategories(formData){
    console.log(formData);
    return this.http.post(`${this.url}/addsubcategories`,formData);
  }

  //Get sub-categories
  getsubcat(){
    return this.http.get(`${this.url}/getsubcategories`);
  }

  //Get Sub-categories by id
  getsubcatbyid(categoryId, id){
    return this.http.get(`${this.url}/getsubcategories/${categoryId}/${ id}`);
  }

  //Edit sub-categories
  editsubcat(formData){
    console.log(formData);
    return this.http.put(`${this.url}/updatesubcategories`,formData);
  }
  //Delete sub-categories
  deletesubcat(sub_categories_id){
    return this.http.delete(`${this.url}/deletesubcategories/${sub_categories_id}`);
  }

  getcatById(id){
    return this.http.get(`${this.url}/getcategories/${id}`);
  }
}
