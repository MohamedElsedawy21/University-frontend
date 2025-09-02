import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Security/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
   constructor(private router: Router, public auth: AuthService) {}

  goToFaculties(): void {
    this.router.navigate(['/faculties']);
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }

  goToCourses(): void {
    this.router.navigate(['/courses']);
  }

  goToStudentCourses(): void {
    this.router.navigate(['/studentcourses']);
  }
}
