import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {AddSubCategoriesComponent} from '../add-sub-categories/add-sub-categories.component';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  providers: [NgbCarouselConfig]
})
export class SubCategoriesComponent implements OnInit {
  options:NgbModalOptions  = {
    
    backdrop: false,
    centered: true
  } 
  subcategories: any[];
  SubCategoriesId: string = '';
  SubCategoriesDetails: string = '';
  CategoriesId: string = '';
  BrandId: string = '';

  constructor(private modalService : NgbModal,
              private scs:SubCategoriesService) { }

  ngOnInit(){
    this.getsubcatlist();
  }

openModal(data = null){
  const modalRef = this.modalService.open(AddSubCategoriesComponent, this.options);
  modalRef.componentInstance.subcategoriesData = data;
  modalRef.result
  .then(result => {
    console.log("Result: ", result);
    if(result == 'added/edited one item') this.getsubcatlist();
  })
  .catch(error => {
    console.error(error)
  })
 }

 //Get data
 getsubcatlist(){
    this.scs.getsubcat().subscribe((data:any) => {
      this.subcategories = data.data;
      console.log("Response:",data);
    })
 }

 //Delete data
 delete(sub_categories_id){
   this.scs.deletesubcat(sub_categories_id).subscribe(data => {
     console.log("Data:",data);
     this.getsubcatlist();
   })
 }
}
