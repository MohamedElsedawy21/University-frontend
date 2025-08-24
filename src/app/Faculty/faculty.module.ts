import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FacultyFormComponent } from '../Faculty/faculty-form/faculty-form.component';
import { FacultyListComponent } from '../Faculty/faculty-list/faculty-list.component';
import { FacultyComponent } from './faculty/faculty.component';

@NgModule({
  declarations: [
    FacultyFormComponent,
    FacultyListComponent,
    FacultyComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FacultyFormComponent,
    FacultyListComponent
  ]
})
export class FacultyModule { }
