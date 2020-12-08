import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BrandsService } from 'src/app/brands.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import brand from '../../Models/brands';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit{
  @Input() public brandData;
  bngForm: FormGroup;
  BrandId: string = '';
  BrandName: string = '';
  Image:string = '';
  brandImage:string = '';
  Description:string= '';
  logoDesc:string= '';
  
  constructor(private fb:FormBuilder,
              private activeModal: NgbActiveModal,
              private bs:BrandsService,
              private http:HttpClient) {
    this.createForm();
   
  }
  ngOnInit(){
    if(this.brandData){
      this.add.BrandId.setValue(this.brandData.brand_id);
      this.add.BrandName.setValue(this.brandData.brand_name);
      this.add.Image.setValue(this.brandData.images);
      this.add.brandImage.setValue(this.brandData.brand_image);
      this.add.Description.setValue(this.brandData.description);
      this.add.logoDesc.setValue(this.brandData.logo_desc);
    }

  }

  createForm(){
    this.bngForm = this.fb.group({
      BrandId:new FormControl ('',Validators.required),
      BrandName:new FormControl ('',Validators.required),
      Image:new FormControl('',Validators.required),
      Description:new FormControl('',Validators.required),
      brandImage:new FormControl('',Validators.required),
      logoDesc:new FormControl('',Validators.required)
    });
  }

  get add() {
    return this.bngForm.controls;
  }
  

  //submitting data to database
  addBrand(){
   
    // let info = {
    //   brand_id: this.add.BrandId.value,
    //   brand_name: this.add.BrandName.value,
    //   images: this.add.Images.value,
    //   description: this.add.Description.value
    // }
    const formData = new FormData();

    formData.append('image', this.add.Image.value);
    formData.append("brand_id",  this.add.BrandId.value);
    formData.append("brand_name",  this.add.BrandName.value);
    // formData.append("description",  this.add.Description.value);
    // formData.append("image",this.add.brandImage.value);
    // formData.append('logo_desc',this.add.logoDesc.value);
    console.log("data",formData);
    if(!this.brandData) {
      this.bs.addBrand(formData).subscribe((res: any) => {
        console.log("Response: ", res);
        this.activeModal.close("added/edited one item");

      })
    } else 
    this.updateBrands();
   
 
  }

  cancel(){
   this.activeModal.dismiss();
  }

  //Edit data 
  updateBrands(){
   
    // let obj = {
    //   brand_id: this.add.BrandId.value,
    //   brand_name: this.add.BrandName.value,
    //   images: this.add.Images.value,
    //   description: this.add.Description.value
    // }
    const formData = new FormData();
    formData.append('logo', this.add.Image.value);
    formData.append("brand_id",  this.add.BrandId.value);
    formData.append("brand_name",  this.add.BrandName.value);
    formData.append("description",  this.add.Description.value);
    formData.append('image',this.add.brandImage.value);
    formData.append('logo_desc',this.add.logoDesc.value);
    this.bs.editBrand(formData).subscribe((res:any) => {
      console.log("Response:",res);
      this.activeModal.close("added/edited one item");
    }) 
   
  }


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.add.Image.setValue(file); 
      
    }
  }

  onFilesSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.add.brandImage.setValue(file);
    }
  }
  
  


  //Edit Image
  editimg(){
    this.onFileSelect(event);
  }
  
}
