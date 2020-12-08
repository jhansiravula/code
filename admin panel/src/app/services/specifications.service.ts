import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecificationsService {

  url = 'http://localhost:8081/api/auth';

  constructor(private http:HttpClient) { }

  //Add specifications
  addSpec(formData){
    return this.http.post(`${this.url}/addproductspec`,formData);
  }

  //Get Specifications
  getSpec(){
    return this.http.get(`${this.url}/getproductspec`);
  }

  //Get specifications by Id
  getspecbyid(id){
    return this.http.get(`${this.url}/getspec/${id}`);
  }

  //Edit Specification
  editSpec(formData){
    return this.http.put(`${this.url}/editspec`,formData)
  }

  getsubcatbyid(id){
    return this.http.get(`${this.url}/getsubcategories/${id}`);
  }

  getcatById(id){
    return this.http.get(`${this.url}/getcategories/${id}`);
  }
}