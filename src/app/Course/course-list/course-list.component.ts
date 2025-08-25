import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Course } from '../../Course/course.model';
import { CourseService } from '../../Course/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses$!: Observable<Course[]>;  
  showUpdateModal = false;
  updateForm!: FormGroup;
  selectedCourse?: Course;      

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.courses$; 
    this.courseService.loadCourses().subscribe(); 
  }

  openUpdateForm(course: Course): void {
    this.selectedCourse = course;
    this.updateForm = this.fb.group({
      courseName: [course.courseName, Validators.required],
      facultyId: [course.facultyId, Validators.required]
    });
    this.showUpdateModal = true;
  }

  closeUpdateForm(): void {
    this.showUpdateModal = false;
  }

  submitUpdate(): void {
    if (this.updateForm.valid && this.selectedCourse) {
      const updatedCourse: Course = {
        ...this.selectedCourse,
        ...this.updateForm.value
      };

      this.courseService.updateCourse(updatedCourse).subscribe({
        next: () => {
          console.log('Course updated successfully');
          this.closeUpdateForm();
        },
        error: (err) => {
          console.error('Error updating course:', err);
        }
      });
    }
  }

  confirmDelete(course: Course): void {
    if (course.courseId && confirm(`Are you sure you want to delete course "${course.courseName}"?`)) {
      this.courseService.deleteCourse(course.courseId).subscribe({
        next: () => {
          console.log(`Course with ID ${course.courseId} deleted successfully`);
        },
        error: (err) => {
          console.error('Error deleting course:', err);
        }
      });
    }
  }
}
