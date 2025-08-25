import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentCourse } from '../../StudentCourse/studentCourse.model';
import { StudentCourseService } from '../../StudentCourse/studentCourse.service';

@Component({
  selector: 'app-student-course-list',
  templateUrl: './student-course-list.component.html',
  styleUrls: ['./student-course-list.component.scss']
})
export class StudentCourseListComponent implements OnInit {
  studentCourses$!: Observable<StudentCourse[]>;
  showUpdateModal = false;
  updateForm!: FormGroup;
  selectedStudentCourseId?: number;

  constructor(
    private studentCourseService: StudentCourseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.studentCourses$ = this.studentCourseService.studentCourses$;
    this.studentCourseService.getStudentCourses().subscribe();
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
    if (this.updateForm.valid && this.selectedStudentCourseId) {
      const updatedStudentCourse: StudentCourse = {
        ...this.updateForm.value,
        studentCoursesId: this.selectedStudentCourseId
      };

      this.studentCourseService.updateStudentCourse(this.selectedStudentCourseId, updatedStudentCourse).subscribe({
        next: () => {
          console.log('StudentCourse updated successfully');
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
        },
        error: (err) => {
          console.error('Error deleting student course:', err);
        }
      });
    }
  }
}
