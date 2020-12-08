import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormsModule } from '@angular/forms';
import{  DetailsService } from 'src/app/services/details.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { BrandsService } from 'src/app/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { EditorComponent } from '@tinymce/tinymce-angular';
declare var tinymce;

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.css']
})
export class AddDetailsComponent implements OnInit {
  @Input() public detailsData;

  dngForm: FormGroup;
  ProductId:string ;
  ProductName:string = '';
  ProductImage:string = '';
  ProductDescription:string = '';
  SubCategoryId:string = '';
  CategoryId:string = '';
  BrandId:string = '';
  brands: any;
  categoriesList: any;
  subCategories:any ;
  

 
  constructor(private fb:FormBuilder,
              private activeModal:NgbActiveModal,
              private ds:DetailsService,
              private bs: BrandsService,
              private cs: CategoriesService,
              private scs:SubCategoriesService,
              private http:HttpClient) {
              
        this.createForm();
        this.getBrands();
     
      }
  

  ngOnInit() {
    
    if(this.detailsData)  {
    this.add.ProductId.setValue(this.detailsData.product_id);
    this.add.ProductName.setValue(this.detailsData.product_name);
    this.add.ProductImage.setValue(this.detailsData.product_image);
    this.add.ProductDescription.setValue(this.detailsData.product_description);
    this.add.SubCategoryId.setValue(this.detailsData.sub_categories_id);
    this.add.CategoryId.setValue(this.detailsData.categories_id);
    this.add.BrandId.setValue(this.detailsData.brand_id);
    }
  }
  // tinymce(){
  //   let newContent = tinymce.activeEditor.getContent();
  //   console.log("content: ", newContent);
    
  // }

  createForm(){
    this.dngForm = this.fb.group({
      ProductId:new FormControl('',Validators.required),
      ProductName:new FormControl('',Validators.required),
      ProductImage:new FormControl('',Validators.required),
      ProductDescription:new FormControl('',Validators.required),
      SubCategoryId:new FormControl('',Validators.required),
      CategoryId: new FormControl('',Validators.required),
      BrandId:new FormControl('',Validators.required)
    })
  }

  get add() {
    return this.dngForm.controls;
  }


  //Adding Product Details
  adddetails(){
    // let info ={
    //   product_id: this.add.ProductId.value,
    //   product_name: this.add.ProductName.value,
    //   product_image: this.add.ProductImage.value,
    //   product_description: this.add.ProductDescription.value,
    //   sub_categories_id: this.add.SubCategoryId.value,
    //   categories_id:this.add.CategoryId.value,
    //   brand_id: this.add.BrandId.value
    // }
    // this.tinymce();

    const formData = new FormData();
    formData.append('product_id',this.add.ProductId.value);
    formData.append('product_name',this.add.ProductName.value);
    formData.append('image',this.add.ProductImage.value);
    formData.append('product_description',this.add.ProductDescription.value);
    formData.append('sub_categories_id', this.add.SubCategoryId.value);
    formData.append('categories_id',this.add.CategoryId.value);
    formData.append('brand_id',this.add.BrandId.value);
    console.log(this.add.ProductDescription.value);
    
    if(!this.detailsData){
      this.ds.addProductDetails(formData).subscribe((res:any) => {
      console.log("Response:",res);
      this.activeModal.close("added/edited one item");
      })
    } else this.updateProductList();

  }

  cancel(){
    this.activeModal.dismiss();
   }
  
  //Edit Product Data
  updateProductList(){
    // let info ={
    //   product_id: this.add.ProductId.value,
    //   product_name: this.add.ProductName.value,
    //   product_image: this.add.ProductImage.value,
    //   product_description: this.add.ProductDescription.value,
    //   sub_categories_id: this.add.SubCategoryId.value,
    //   categories_id:this.add.CategoryId.value,
    //   brand_id: this.add.BrandId.value
    // }

    const formData = new FormData();
    formData.append('product_id',this.add.ProductId.value);
    formData.append('product_name',this.add.ProductName.value);
    formData.append('image',this.add.ProductImage.value);
    formData.append('product_description',this.add.ProductDescription.value);
    formData.append('sub_categories_id', this.add.SubCategoryId.value);
    formData.append('categories_id',this.add.CategoryId.value);
    formData.append('brand_id',this.add.BrandId.value);
   this.ds.editProductDetails(formData).subscribe((res:any) => {
    console.log("Response:",res);
    this.activeModal.close("added/edited one item");
   })
  
  }

  getBrands() {
    this.bs.getBrands().subscribe((data: any) => {
      this.brands = data.data;
      console.log("Data: ", data);
    })
  }

  getCatById(id) {
    console.log('Id: ', id)
    this.cs.getcatById(id).subscribe((data: any) => {
      this.categoriesList = data.data;
      console.log('Response:', data);
    })
  }

  getSubCatById(categoryId, id){
    console.log('Id:', categoryId, id );
  
    this.scs.getsubcatbyid(categoryId, id).subscribe((data:any) => {
      this.subCategories = data.data;
      console.log('Response:', data);
    })
  }

  getProductById(categoryId, id){
    console.log('Id:', categoryId, id );
    this.scs.getsubcatbyid(categoryId, id).subscribe((data:any) => {
      this.subCategories = data.data;
      console.log('Response:', data);
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.add.ProductImage.setValue(file);
    }
  }

}
