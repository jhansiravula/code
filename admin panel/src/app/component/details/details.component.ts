import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup }from '@angular/forms';
import{ AddDetailsComponent} from '../add-details/add-details.component';
import { DetailsService } from 'src/app/services/details.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  options: NgbModalOptions = {
    backdrop: false,
    centered: true,
    size: "lg"
  }
  Products: any[];
  
 

filesToUpload: Array<File> = [];
  uploadForm: FormGroup;

  constructor(private http:HttpClient,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private ds:DetailsService) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      profile: ['']
    });
    this.getDetails();
  }

  openModal(data = null) {
    const modalRef = this.modalService.open(AddDetailsComponent, this.options);
    modalRef.componentInstance.detailsData = data;
    modalRef.result
      .then(result => {
        console.log("Result: ", result);
        if(result == 'added/edited one item') this.getDetails();
      })
      .catch(error => {
        console.error(error)
      })
  }

  //Get Data
  getDetails() {
    this.ds.getProductDetails().subscribe((res: any) => {
      this.Products = res.data;
      console.log("Data:",res)
    })
  }



  //Delete
  delete(product_id) {
    this.ds.deleteProductDetails(product_id).subscribe(data => {
      console.log('Response:',data);
      this.getDetails();
    })
  }

  // getDesc(desc) {

  //   let divEle = document.getElementById('product_desc');
  //   divEle.innerHTML = desc;
  //   console.log(divEle);
  //   return '';
  // }


}
