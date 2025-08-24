import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentCourse } from '../../StudentCourse/studentCourse.model';
import { StudentCourseService } from '../../StudentCourse/studentCourse.service';

@Component({
  selector: 'app-student-course-list',
  templateUrl: './student-course-list.component.html',
  styleUrls: ['./student-course-list.component.scss']
})
export class StudentCourseListComponent implements OnInit {
  studentCourses: StudentCourse[] = [];
  showUpdateModal = false;
  updateForm!: FormGroup;
  selectedStudentCourseId?: number;

  constructor(
    private studentCourseService: StudentCourseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadStudentCourses();
  }

  loadStudentCourses(): void {
    this.studentCourseService.getStudentCourses().subscribe({
      next: (data) => {
        this.studentCourses = data;
      },
      error: (err) => {
        console.error('Error fetching student courses:', err);
      }
    });
  }

  openUpdateForm(studentCourse: StudentCourse): void {
    this.selectedStudentCourseId = studentCourse.studentCoursesId;
    this.updateForm = this.fb.group({
      studentId: [studentCourse.studentId, Validators.required],
      courseId: [studentCourse.courseId, Validators.required],
      grade: [studentCourse.grade, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
    this.showUpdateModal = true;
  }

  closeUpdateForm(): void {
    this.showUpdateModal = false;
  }

  submitUpdate(): void {
    console.log('Opening update form for:', this.selectedStudentCourseId);
    if (this.updateForm.valid && this.selectedStudentCourseId) {
      const updatedStudentCourse: StudentCourse = {
        ...this.updateForm.value,
        studentCourseId: this.selectedStudentCourseId
      };

      this.studentCourseService.updateStudentCourse(this.selectedStudentCourseId, updatedStudentCourse).subscribe({
        next: () => {
          console.log('StudentCourse updated successfully');
          this.loadStudentCourses();
          this.closeUpdateForm();
        },
        error: (err) => {
          console.error('Error updating student course:', err);
        }
      });
    }
  }

  confirmDelete(studentCourse: StudentCourse): void {
    if (studentCourse.studentCoursesId && confirm(`Are you sure you want to delete this student course?`)) {
      this.studentCourseService.deleteStudentCourse(studentCourse.studentCoursesId).subscribe({
        next: () => {
          console.log(`StudentCourse deleted successfully`);
          this.studentCourses = this.studentCourses.filter(sc => sc.studentCoursesId !== studentCourse.studentCoursesId);
        },
        error: (err) => {
          console.error('Error deleting student course:', err);
        }
      });
    }
  }
}
