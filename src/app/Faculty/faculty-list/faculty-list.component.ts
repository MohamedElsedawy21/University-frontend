import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Faculty } from '../../Faculty/faculty.model';
import { FacultyService } from '../../Faculty/faculty.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {
  faculties$!: Observable<Faculty[]>;   
  showUpdateModal = false;           
  updateForm!: FormGroup;        
  selectedFaculty?: Faculty;         

  constructor(
    private facultyService: FacultyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.faculties$ = this.facultyService.getFaculties();
    this.facultyService.loadFaculties().subscribe();
  }

  openUpdateForm(faculty: Faculty): void {
    this.selectedFaculty = faculty; 
    this.updateForm = this.fb.group({
      facultyName: [faculty.facultyName, Validators.required]
    });
    this.showUpdateModal = true;
  }

  closeUpdateForm(): void {
    this.showUpdateModal = false;
  }

  submitUpdate(): void {
    if (this.selectedFaculty && this.updateForm.valid) {
      const updatedFaculty: Faculty = {
        ...this.selectedFaculty,
        ...this.updateForm.value
      };

      this.facultyService.updateFaculty(updatedFaculty).subscribe(() => {
        this.closeUpdateForm();
      });
    }
  }

  confirmDelete(faculty: Faculty): void {
    if (confirm(`Are you sure you want to delete ${faculty.facultyName}?`)) {
      this.facultyService.deleteFaculty(faculty.facultyId!).subscribe();
    }
  }
}
