import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      studentName: ['', Validators.required],
      level: ['', [Validators.required, Validators.min(1)]],
      facultyId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const newStudent: Student = this.studentForm.value;
      console.log('Sending to backend:', newStudent);

      this.studentService.addStudent(newStudent).subscribe({
        next: (response) => {
          console.log('Student created successfully:', response);
          this.studentForm.reset();
        },
        error: (err) => {
          console.error('Error creating student:', err);
        }
      });
    }
  }
}
