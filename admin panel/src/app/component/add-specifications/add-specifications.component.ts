import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { SpecificationsService } from '../../services/specifications.service';
import { BrandsService } from 'src/app/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-add-specifications',
  templateUrl: './add-specifications.component.html',
  styleUrls: ['./add-specifications.component.css']
})
export class AddSpecificationsComponent implements OnInit {
  @Input() public specificationData;


  spngForm: FormGroup;

  SpecificationId: string='';
  SpecificationName: string= '';
  SpecificationImage: string = '';
  Description: string= '';
  ProductId: string = '';
  SubCategoryId: string = '';
  CategoriesId: string ='';
  BrandId: string = '';
  brands: any;
  categoriesList: any;
  subCategories: any;
  categories: any;
  products: any;

  constructor(private fb:FormBuilder,
              private sps:SpecificationsService,
              private activeModal: NgbActiveModal,
              private http:HttpClient,
              private bs:BrandsService,
              private cs:CategoriesService,
              private scs:SubCategoriesService, 
              private ds:DetailsService){
                this.createForm();
                this.getBrands();
                this.getCatList();
                
                
              }
  ngOnInit() {
    if(this.specificationData){
      this.add.SpecificationId.setValue(this.specificationData.specification_id);
      this.add.SpecificationName.setValue(this.specificationData.specification_name);
      this.add.SpecificationImage.setValue(this.specificationData.specification_images);
      this.add.Description.setValue(this.specificationData.specification_desc);
      this.add.ProductId.setValue(this.specificationData.product_id);
      this.add.SubCategoryName.setValue(this.specificationData.sub_categories_id);
      this.add.CategoryId.setValue(this.specificationData.categories_id);
      this.add.BrandId.setValue(this.specificationData.brand_id);
    }
  }

  createForm(){
    this.spngForm = this.fb.group({
      SpecificationId: new FormControl('',Validators.required),
      SpecificationName: new FormControl('',Validators.required),
      SpecificationImage:new FormControl('',Validators.required),
      Description: new FormControl('',Validators.required),
      ProductId: new FormControl('',Validators.required),
      SubCategoryId: new FormControl('',Validators.required),
      CategoryId: new FormControl('',Validators.required),
      BrandId: new FormControl('',Validators.required)
    });
  }

  get add(){
    return this.spngForm.controls;
  }


  addSpecification(){
    const formData =new FormData();
    formData.append('specification_id',this.add.SpecificationId.value);
    formData.append('specification_name',this.add.SpecificationName.value);
    formData.append('image',this.add.SpecificationImage.value);
    formData.append('specification_desc',this.add.Description.value);
    formData.append('product_id',this.add.ProductId.value);
    formData.append('sub_categories_id', this.add.SubCategoryId.value);
    formData.append('categories_id',this.add.CategoryId.value);
    formData.append('brand_id',this.add.BrandId.value);
    if(!this.specificationData){
      this.sps.addSpec(formData).subscribe((data:any) => {
        console.log("Response:",data);
        this.activeModal.close("added/edited one item");
      })
    } else this.updateSpec();
  }


  cancel(){
    this.activeModal.dismiss();
   }

   
  updateSpec(){
    const formData =new FormData();
    formData.append('specification_id',this.add.SpecificationId.value);
    formData.append('specification_name',this.add.SpecificationName.value);
    formData.append('specification_images',this.add.SpecificationImage.value);
    formData.append('specification_desc',this.add.Description.value);
    formData.append('product_id',this.add.ProductId.value);
    formData.append('sub_categories_id', this.add.SubCategoryId.value);
    formData.append('categories_id',this.add.CategoryId.value);
    formData.append('brand_id',this.add.BrandId.value);
    if(!this.specificationData){
      this.sps.editSpec(formData).subscribe((data:any) => {
        console.log("Response:",data);
        this.activeModal.close("added/edited one item");
      })
    }
  }

  onFileSelect(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.add.SpecificationImage.setValue(file);
    }
  }

  getBrands() {
    this.bs.getBrands().subscribe((data: any) => {
      this.brands = data.data;
      console.log("Data: ", data);
    })
  }

  getCatList(){
    this.cs.getcat().subscribe((data: any) =>{
      this.categories = data.data;
      console.log('Response:',data);
    })
  }

  getCatById(id) {
    console.log('Id: ', id)
    this.cs.getcatById(id).subscribe((data: any) => {
      this.categoriesList = data.data;
      console.log('Response:', data);
    })
  }

  getSubCatById(categoryId,id){
    this.scs.getsubcatbyid(categoryId,id).subscribe((data:any) => {
      this.subCategories = data.data;
      console.log('Response:', data);
    })
  }

  getProductById(id){
    this.ds.getProductById(id).subscribe((data:any) => {
      this.products = data.data
    })
  }
 
  getSpecById(id){
    this.sps.getspecbyid(id).subscribe((data:any) => {
      this.products = data.data;
      console.log('Response:',data);
    })
  }




 


}
