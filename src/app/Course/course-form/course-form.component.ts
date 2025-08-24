import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../Course/course.service';
import { Course } from '../../Course/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      facultyId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const newCourse: Course = this.courseForm.value;
      console.log('Sending to backend:', newCourse);

      this.courseService.addCourse(newCourse).subscribe({
        next: (response) => {
          console.log('Course created successfully:', response);
          this.courseForm.reset();
        },
        error: (err) => {
          console.error('Error creating course:', err);
        }
      });
    }
  }
}
