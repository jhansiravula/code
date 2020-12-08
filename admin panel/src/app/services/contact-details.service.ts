import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactDetailsService {
  
  url = 'http://localhost:8081/api/auth';

  constructor(private http:HttpClient) { }

  //Get Contact Details
  getContact(){
    return this.http.get(`${this.url}/getcontactdetails`);
  }

  //Delete Contact Details
  deleteContact(person_id){
    return this.http.delete(`${this.url}/deletecontactdetails/${person_id}`);
  }
}
