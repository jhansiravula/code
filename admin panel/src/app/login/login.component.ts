import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: any;
  emailid: string = '';
  password: string = '';
  token: any;
  user: any;
  

  constructor(private http: HttpClient,
    public fb: FormBuilder,
    public router: Router,
    public loginservice: LoginService) { }

  login() {
    console.log("hi");
    let info = {
      emailid: this.emailid,
      password: this.password
    }
    if (info.emailid == '' && info.password == '') {
      alert("Please enter your email");
    }
    else if (info.emailid == '') {
      alert("Please enter your email");
    }
    else if (info.password == '') {
      alert("Please enter your password");
    }
    else {

      console.log(JSON.stringify(info, null, 4));
      this.loginservice.authenticationUser(info).subscribe((data: any) => {
        console.log("Data: ", data);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('usertoken', this.token);
        localStorage.setItem('userInfo', JSON.stringify(this.user));
        this.router.navigate(['/homepage']);
      })
    }
  } 
  ngOnInit() { }
  
}
