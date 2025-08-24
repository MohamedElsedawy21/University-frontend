import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
  goHome(): void {
    this.router.navigate(['/']);
  }

}
