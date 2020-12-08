import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  cngForm: FormGroup;
  firstName: string = '' ;
  eMail: string = '';
  telephone: string = '';
  comments: string = '';
  formData: any;

  constructor(private fb: FormBuilder, private apiService: ProductsService) {
    this.contactForm();
  }

  ngOnInit() {

  }

  contactForm() {
    this.cngForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      eMail: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      comments: new FormControl('', Validators.required)
    });

  }
  get form() {
    return this.cngForm.controls;
  }

  formDetails() {
    let obj = {
      full_name: this.form.firstName.value,
      email: this.form.eMail.value,
      mobile_no: this.form.telephone.value,
      message: this.form.comments.value
    };
    this.apiService.sendContact(obj).subscribe((data: any) => {
        console.log('Response:', data);

      });
    this.cngForm.reset();
    // alert('Thank you for your inquiry.Our Sales Executive get in touch with you');
  }
}
