import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FacultyComponent } from './Faculty/faculty/faculty.component';
import { StudentComponent } from './Student/student/student.component';
import { CourseComponent } from './Course/course/course.component';
import { StudentCourseComponent } from './StudentCourse/student-course/student-course.component';
import { AuthorizationComponent } from './Security/authorization/authorization.component';
import { AuthGuard } from './Security/auth.guard';
import { RoleGuard } from './Security/role.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: AuthorizationComponent },

  { path: 'faculties', component: FacultyComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_OWNER'] } },
  { path: 'students', component: StudentComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMINISTRATION', 'ROLE_OWNER'] } },
  { path: 'courses', component: CourseComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_ADMINISTRATION', 'ROLE_OWNER'] } },
  { path: 'studentcourses', component: StudentCourseComponent, canActivate: [RoleGuard], data: { roles: ['ROLE_TUTORS', 'ROLE_OWNER'] } },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
