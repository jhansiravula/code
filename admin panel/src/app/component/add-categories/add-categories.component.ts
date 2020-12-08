import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { BrandsService } from 'src/app/brands.service';


@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  @Input() public categoriesData
  cngForm: FormGroup;
  CategoriesId: any ;
  CategoriesName: string = '';
  BrandId: any ;
  Images: string = '';
  Description: string = '';
  Categories: any[];
  brands: any[];
  categoriesList: any;

  constructor(private fb: FormBuilder,
    private cs: CategoriesService,
    private activeModal: NgbActiveModal,
    private bs: BrandsService,
    private http: HttpClient) {
    this.getBrands();
    this.categories();
  }

  ngOnInit() {
    if (this.categoriesData) {
      this.add.CategoriesId.setValue(this.categoriesData.categories_id);
      this.add.CategoriesName.setValue(this.categoriesData.categories_name);
      this.add.BrandId.setValue(this.categoriesData.brand_id);
      // this.add.Images.setValue(this.categoriesData.categories_images);
      // this.add.Description.setValue(this.categoriesData.categories_description);
    }

  }
  categories() {
    this.cngForm = this.fb.group({
      CategoriesId: new FormControl('', Validators.required),
      CategoriesName: new FormControl('', Validators.required),
      BrandId: new FormControl('', Validators.required)
      // Images: new FormControl('', Validators.required),
      // Description: new FormControl('', Validators.required)
    });
  }
  get add() {
    return this.cngForm.controls;
  }


  //Add categories
  addCategories() {
    //  let obj = {
    //   categories_id:this.add.CateegoriesId.value,
    //   categories_name:this.add.CategoriesName.value,
    //   brand_id:this.add.BrandId.value
    //  }
    const formData = new FormData();
    // formData.append('image', this.add.Images.value);
    formData.append('categories_id', this.add.CategoriesId.value);
    formData.append("categories_name", this.add.CategoriesName.value);
    formData.append('brand_id', this.add.BrandId.value);
    // formData.append('categories_description', this.add.Description.value);

    if (!this.categoriesData) {
      this.cs.addCategories(formData).subscribe((res: any) => {
        console.log("Response: ", res);
        this.activeModal.close("added/edited one item");
      })
    } else this.updatecategories();

  }
  cancel() {
    this.activeModal.dismiss();
  }

  //Eidt
  updatecategories() {
    // let obj = {
    //   categories_id: this.add.CategoriesId.value,
    //   categories_name: this.add.CategoriesName.value,
    //   brand_id: this.add.BrandId.value,
    //   categories_images: this.add.Images.value,
    //   categories_description: this.add.Description.value
    // }

    const formData = new FormData();
    // formData.append('image', this.add.Images.value);
    formData.append('categories_id', this.add.CategoriesId.value);
    formData.append("categories_name", this.add.CategoriesName.value);
    formData.append('brand_id', this.add.BrandId.value);
    // formData.append('categories_description', this.add.Description.value);

    this.cs.editcategories(formData).subscribe((res: any) => {
      console.log("Response:", res);
      this.activeModal.close("added/edited one item");
    })
  }

  // onFileSelect(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.add.Images.setValue(file);
  //   }
  // }

  
  getBrands() {
    this.bs.getBrands().subscribe((data: any) => {
      this.brands = data.data;
      console.log("Data: ", data);
    })
  }

  //Get categories
  getCatById(id) {
    console.log('Id: ', id)
    this.cs.getcatById(id).subscribe((data: any) => {
      this.categoriesList = data.data;
      console.log('Response:', data);
    })
  }

}

