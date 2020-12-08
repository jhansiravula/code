import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddSpecificationsComponent } from '../add-specifications/add-specifications.component';
import { SpecificationsService } from 'src/app/services/specifications.service';

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.css']
})
export class SpecificationsComponent implements OnInit {

  options: NgbModalOptions = {
    backdrop: false,
    centered: true
  }
  specifications: any[];

  constructor(private modalService : NgbModal,
              private sps: SpecificationsService) { }

  ngOnInit() {
    this.getSpecList();
  }

  openModal(data = null){
    const modalRef = this.modalService.open(AddSpecificationsComponent, this.options);
    modalRef.componentInstance.specificationData = data;
    modalRef.result
    .then(result => {
      console.log("Result: ", result);
      if(result == 'added/edited one item') this.getSpecList();
    })
    .catch(error => {
      console.error(error)
    })
  
   }

   getSpecList(){
    this.sps.getSpec().subscribe((data: any) => {
      this.specifications = data.data;
    })
   }

}
