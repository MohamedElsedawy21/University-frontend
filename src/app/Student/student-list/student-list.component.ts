import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../Student/student.model';
import { StudentService } from '../../Student/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students$ = this.studentService.students$;
  showUpdateModal = false;
  updateForm!: FormGroup;
  selectedStudentId?: number;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.studentService.loadStudents();
  }

  openUpdateForm(student: Student): void {
    this.selectedStudentId = student.studentId;
    this.updateForm = this.fb.group({
      studentName: [student.studentName, Validators.required],
      level: [student.level, Validators.required],
      facultyId: [student.facultyId, Validators.required]
    });
    this.showUpdateModal = true;
  }

  closeUpdateForm(): void {
    this.showUpdateModal = false;
  }

  submitUpdate(): void {
    if (this.updateForm.valid && this.selectedStudentId) {
      const updatedStudent: Student = this.updateForm.value;

      this.studentService.updateStudent(this.selectedStudentId, updatedStudent).subscribe({
        next: () => {
          console.log('Student updated successfully');
          this.closeUpdateForm();
        },
        error: (err) => {
          console.error('Error updating student:', err);
        }
      });
    }
  }

  confirmDelete(student: Student): void {
    if (student.studentId && confirm(`Are you sure you want to delete student "${student.studentName}"?`)) {
      this.studentService.deleteStudent(student.studentId).subscribe({
        next: () => console.log(`Student with ID ${student.studentId} deleted successfully`),
        error: (err) => console.error('Error deleting student:', err),
      });
    }
  }
}
