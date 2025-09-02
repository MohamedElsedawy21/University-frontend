import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/home']);
  }
  
}
