import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Faculty } from '../../Faculty/faculty.model';
import { FacultyService } from '../../Faculty/faculty.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {
  faculties: Faculty[] = [];
  showUpdateModal = false;        
  updateForm!: FormGroup;        
  selectedFacultyId?: number;

  constructor(
    private facultyService: FacultyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadFaculties();
    this.facultyService.loadFaculties();
  }

  loadFaculties(): void {
    this.facultyService.getFaculties().subscribe({
      next: (data) => {
        this.faculties = data;
      },
      error: (err) => {
        console.error('Error fetching faculties:', err);
      }
    });
  }

 
  openUpdateForm(faculty: Faculty): void {
    this.selectedFacultyId = faculty.facultyId;
    this.updateForm = this.fb.group({
      facultyName: [faculty.facultyName, Validators.required]
    });
    this.showUpdateModal = true;
  }

  
  closeUpdateForm(): void {
    this.showUpdateModal = false;
  }

  
  submitUpdate(): void {
    if (this.updateForm.valid && this.selectedFacultyId) {
      const updatedFaculty: Faculty = this.updateForm.value;

      this.facultyService.updateFaculty(this.selectedFacultyId, updatedFaculty).subscribe({
        next: (response) => {
          console.log('Faculty updated successfully:', response);
          this.loadFaculties(); 
          this.closeUpdateForm();
        },
        error: (err) => {
          console.error('Error updating faculty:', err);
        }
      });
    }
  }

 
  confirmDelete(faculty: Faculty): void {
    if (faculty.facultyId && confirm(`Are you sure you want to delete faculty "${faculty.facultyName}"?`)) {
      this.facultyService.deleteFaculty(faculty.facultyId).subscribe({
        next: () => {
          console.log(`Faculty with ID ${faculty.facultyId} deleted successfully`);
          this.faculties = this.faculties.filter(f => f.facultyId !== faculty.facultyId);
        },
        error: (err) => {
          console.error('Error deleting faculty:', err);
        }
      });
    }
  }
}
