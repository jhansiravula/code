import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AddBrandComponent } from '../add-brand/add-brand.component';
import { BrandsService } from 'src/app/brands.service';


@Component({
  selector: 'app-brands',
  templateUrl: 'brands.component.html'
})
export class BrandsComponent implements OnInit {
  options: NgbModalOptions = {
    backdrop: false,
    centered: true
  }

  Brands: any[];
  BrandId: string = '';
  BrandName: string = '';
  Images: string = '';
  Description: string = '';
 
  constructor(private modalService: NgbModal,
              private bs: BrandsService) { }

  ngOnInit() {
    this.getBrandsList();

  }
  openModal(data = null) {
    const modalRef = this.modalService.open(AddBrandComponent, this.options);
    modalRef.componentInstance.brandData = data;
    modalRef.result
      .then(result => {
        console.log("Result: ", result);
        if (result == 'added/edited one item') this.getBrandsList();
      })
      .catch(error => {
        console.error(error)
      })
  }

  //Get data 
  getBrandsList() {
    this.bs.getBrands().subscribe((data: any) => {
      this.Brands = data.data;
      console.log("Data: ", data);
    })
  }

  //Delete data
  delete(brand_id) {
    this.bs.deleteBrand(brand_id).subscribe(data => {
      console.log("Data:", data);
      this.getBrandsList();
    })
   }
 
  
  }