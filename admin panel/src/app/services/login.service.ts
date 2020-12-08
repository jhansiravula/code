import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
 import { JwtModule }  from  '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: any;
  user: any;
  authToken: any;

  url = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  authenticationUser(info) {
    return this.http.post(`${this.url}/login`, info);
  }

  storeUserData(token, user) {
    localStorage.setItem('user_token', token);
    //converting object to string
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  //  loggedIn() {
  //      return tokenNotExpired('user_token');
  //   }

  loggedIn(){
    // return this.getJwtToken();
    return !!localStorage.getItem('usertoken');
  }

  getToken(){
    return localStorage.getItem('usertoken');
  }

  getJwtToken(){
    return localStorage.getItem(this.token);
  }
  



}
