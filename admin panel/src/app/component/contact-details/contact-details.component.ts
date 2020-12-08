import { Component, OnInit } from '@angular/core';
import { ContactDetailsService } from 'src/app/services/contact-details.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contacts: any[];
  constructor(private cd:ContactDetailsService) { }

  ngOnInit() {
    this.getContactDetails();
  }

  //Get Contact Details
  getContactDetails(){
    this.cd.getContact().subscribe((data: any) => {
      console.log('Response:',data)
      this.contacts=data.data;
    })
  }

  //Delete Contact Details
  delete(person_id){
    this.cd.deleteContact(person_id).subscribe(data => {
      console.log('Response:',data);
      this.getContactDetails();
    })

  }

}
