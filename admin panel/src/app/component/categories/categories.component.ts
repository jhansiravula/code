import { Input, Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: 'categories.component.html'
})
export class CategoriesComponent implements OnInit {
  
  options:NgbModalOptions  = {
    backdrop: false,
    centered: true
  } 
  categories: any[];
  
  constructor(private modalService : NgbModal,
              private cs:CategoriesService) { }


ngOnInit(){
  this.getCatList();
}

 openModal(data = null){
  const modalRef = this.modalService.open(AddCategoriesComponent, this.options);
  modalRef.componentInstance.categoriesData = data;
  modalRef.result
  .then(result => {
    console.log("Result: ", result);
    if(result == 'added/edited one item') this.getCatList();
  })
  .catch(error => {
    console.error(error)
  })

 }

 //Get categories
  getCatList(){
      this.cs.getcat().subscribe((data: any) =>{
        this.categories = data.data;
        console.log('Response:',data);
      })
 }
 
 //Delete data
 delete(categories_id) {
  this.cs.deleteCategories(categories_id).subscribe(data => {
    console.log("Data:", data);
    this.getCatList();

  })
}

}

