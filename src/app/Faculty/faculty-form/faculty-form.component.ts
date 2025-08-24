import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../Faculty/faculty.service';
import { Faculty } from '../../Faculty/faculty.model';

@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.scss']
})
export class FacultyFormComponent {
  facultyForm: FormGroup;
  faculties: Faculty[] = [];
  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService
  ) {
    this.facultyForm = this.fb.group({
  facultyName: ['', Validators.required]  
  });
}
  onSubmit(): void {
  if (this.facultyForm.valid) {
    const newFaculty: Faculty = this.facultyForm.value;
    console.log('Sending to backend:', newFaculty); 

    this.facultyService.addFaculty(newFaculty).subscribe({
      next: (response) => {
        console.log('Faculty created successfully:', response);
        this.facultyForm.reset();
      },
      error: (err) => {
        console.error('Error creating faculty:', err);
      }
    });
  }
}

}
