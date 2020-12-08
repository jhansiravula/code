import { Component, OnInit, Input } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { SubCategoriesService } from 'src/app/services/sub-categories.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { BrandsService } from 'src/app/brands.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-sub-categories',
  templateUrl: './add-sub-categories.component.html',
  styleUrls: ['./add-sub-categories.component.css']
})
export class AddSubCategoriesComponent implements OnInit  {
  @Input() public subcategoriesData;

  scngForm: FormGroup;

  SubCategoriesId: string = '';
  SubCategoriesDetails: string = '';
  CategoriesId: string ='';
  BrandId: string = '' ;
  Images:string= '';
  Description:string= '';
  categories: any;
  brands: any;
  categoriesList: any;
  subCategories: any;

  constructor(private fb:FormBuilder,
              private scs:SubCategoriesService,
              private bs: BrandsService,
              private cs: CategoriesService,
              private activeModal: NgbActiveModal,
              private http:HttpClient) {
    this.subcategories();
    this.getBrands();
   this.getCatList();
  
   }

   ngOnInit(){
     if(this.subcategoriesData){
     this.add.SubCategoriesId.setValue(this.subcategoriesData.sub_categories_id);
     this.add.SubCategoriesDetails.setValue(this.subcategoriesData.sub_categories_details);
     this.add.CategoriesId.setValue(this.subcategoriesData.categories_id);
     this.add.BrandId.setValue(this.subcategoriesData.brand_id);
     this.add.Images.setValue(this.subcategoriesData.images);
     this.add.Description.setValue(this.subcategoriesData.subcat_description);

     }
   }

  subcategories(){
    this.scngForm = this.fb.group({
      SubCategoriesId: new FormControl('',Validators.required),
      SubCategoriesDetails: new FormControl('',Validators.required),
      CategoriesId: new FormControl('',Validators.required),
      BrandId: new FormControl('',Validators.required),
      Images:new FormControl('',Validators.required),
      Description:new FormControl('',Validators.required)
    });
  }
  
  get add(){
    return this.scngForm.controls;
  }

  //submitting data to database
    addSubCategories(){
      // let obj ={
      //   sub_categories_id:this.add.SubCategoriesId.value,
      //   sub_categories_details:this.add.SubCategoriesDetails.value,
      //   categories_id:this.add.CategoriesId.value,
      //   brand_id:this.add.BrandId.value
      // }
      const formData =new FormData();
      formData.append('sub_categories_id', this.add.SubCategoriesId.value);
      formData.append('sub_categories_details',this.add.SubCategoriesDetails.value);
      formData.append('categories_id',this.add.CategoriesId.value);
      formData.append('brand_id',this.add.BrandId.value);
      formData.append('image',this.add.Images.value);
      formData.append('subcat_description',this.add.Description.value);
      if(!this.subcategoriesData){
      this.scs.addSubCategories(formData).subscribe((res: any) => {
        console.log("Response: ",res);
        this.activeModal.close("added/edited one item");
     })
    } else this.updatesubcat();

   }
  cancel(){
    this.activeModal.close();
  }

  //Edit subcategories
  updatesubcat(){
    // let info = {
    //     sub_categories_id:this.add.SubCategoriesId.value,
    //     sub_categories_details:this.add.SubCategoriesDetails.value,
    //     categories_id:this.add.CategoriesId.value,
    //     brand_id:this.add.BrandId.value,
    //     images:this.add.Images.value,
    //     subcat_description:this.add.Description.value
    // }

    const formData =new FormData();
      formData.append('sub_categories_id', this.add.SubCategoriesId.value);
      formData.append('sub_categories_details',this.add.SubCategoriesDetails.value);
      formData.append('categories_id',this.add.CategoriesId.value);
      formData.append('brand_id',this.add.BrandId.value);
      formData.append('image',this.add.Images.value);
      formData.append('subcat_description',this.add.Description.value);
    this.scs.editsubcat(formData).subscribe((res:any) => {
      console.log("Response:",res);
      this.activeModal.close("added/edited one item");
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.add.Images.setValue(file);
    }
  }

  //Get Brands
  getBrands() {
    this.bs.getBrands().subscribe((data: any) => {
      this.brands = data.data;
      console.log("Data: ", data);
    })
  }

 // Get categories
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
       console.log('Id: ', id)
      this.scs.getsubcatbyid(categoryId, id).subscribe((data:any) => {
        this.subCategories = data.data;
        console.log('Response:', data);
      })
    }
    
}

