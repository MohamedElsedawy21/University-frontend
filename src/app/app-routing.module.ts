import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FacultyComponent } from './Faculty/faculty/faculty.component';
import { StudentComponent } from './Student/student/student.component';
import { CourseComponent } from './Course/course/course.component';
import { StudentCourseComponent } from './StudentCourse/student-course/student-course.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'faculties', component: FacultyComponent },
  { path: 'students', component: StudentComponent }, 
  { path: 'courses', component: CourseComponent },
  { path: 'studentcourses', component: StudentCourseComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
