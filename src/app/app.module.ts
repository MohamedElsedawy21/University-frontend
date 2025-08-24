import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FacultyModule } from './Faculty/faculty.module';
import { StudentModule } from './Student/student.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CourseModule } from './Course/course.module';
import { StudentCourseModule } from './StudentCourse/studentCourse.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FacultyModule,
    StudentModule,
    CourseModule,  
    StudentCourseModule,      
    HttpClientModule       
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
