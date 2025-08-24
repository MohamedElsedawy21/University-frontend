import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../Course/course.model';
import { CourseService } from '../../Course/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  showUpdateModal = false;
  updateForm!: FormGroup;
  selectedCourseId?: number;

  constructor(
    private courseService: CourseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  openUpdateForm(course: Course): void {
    this.selectedCourseId = course.courseId;
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
    if (this.updateForm.valid && this.selectedCourseId) {
      const updatedCourse: Course = {
        ...this.updateForm.value,
        courseId: this.selectedCourseId
      };

      this.courseService.updateCourse(this.selectedCourseId, updatedCourse).subscribe({
        next: (response) => {
          console.log('Course updated successfully:', response);
          this.loadCourses();
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
          this.courses = this.courses.filter(c => c.courseId !== course.courseId);
        },
        error: (err) => {
          console.error('Error deleting course:', err);
        }
      });
    }
  }
}
