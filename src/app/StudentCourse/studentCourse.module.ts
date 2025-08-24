import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentCourseFormComponent } from '../StudentCourse/student-course-form/student-course-form.component';
import { StudentCourseListComponent } from '../StudentCourse/student-course-list/student-course-list.component';
import { StudentCourseComponent } from '../StudentCourse/student-course/student-course.component';


@NgModule({
  declarations: [
    StudentCourseFormComponent,
    StudentCourseListComponent,
    StudentCourseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    StudentCourseFormComponent,
    StudentCourseListComponent
  ]
})
export class StudentCourseModule { }
