import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentCourseService } from '../studentCourse.service';
import { StudentCourse } from '../studentCourse.model';

@Component({
  selector: 'app-student-course-form',
  templateUrl: './student-course-form.component.html',
  styleUrls: ['./student-course-form.component.scss']
})
export class StudentCourseFormComponent {
  studentCourseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentCourseService: StudentCourseService
  ) {
    this.studentCourseForm = this.fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
      grade: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.studentCourseForm.valid) {
      const newStudentCourse: StudentCourse = this.studentCourseForm.value;
      console.log('Sending to backend:', newStudentCourse);

      this.studentCourseService.addStudentCourse(newStudentCourse).subscribe({
        next: (response) => {
          console.log('StudentCourse created successfully:', response);
          this.studentCourseForm.reset();
        },
        error: (err) => {
          console.error('Error creating student course:', err);
        }
      });
    }
  }
}
