import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './component.routing';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { AddSubCategoriesComponent } from './add-sub-categories/add-sub-categories.component';
import { DetailsComponent } from './details/details.component';
import { AddDetailsComponent } from './add-details/add-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AddSpecificationsComponent } from './add-specifications/add-specifications.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    EditorModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  declarations: [
   
    BrandsComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    AddBrandComponent,
    AddCategoriesComponent,
    AddSubCategoriesComponent,
    DetailsComponent,
    AddDetailsComponent,
    ContactDetailsComponent,
    AddSpecificationsComponent,
    SpecificationsComponent
  ],
  entryComponents: [
    AddBrandComponent,
    AddCategoriesComponent,
    AddSubCategoriesComponent,
    AddDetailsComponent,
    AddSpecificationsComponent,
  ]
})
export class ComponentsModule {}
