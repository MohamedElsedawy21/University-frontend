import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Faculty } from '../Faculty/faculty.model';

@Injectable({
  providedIn: 'root' 
})
export class FacultyService {
  private faculty = new BehaviorSubject<any[]>([]);
  private base = 'http://localhost:8080/faculties';  
  constructor(private http: HttpClient) { }

  getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.base);
  }

  addFaculty(faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(this.base, faculty) ;
}

  getFacultyById(id: number): Observable<Faculty> {
    return this.http.get<Faculty>(`${this.base}/${id}`);
  }

  updateFaculty(id: number, faculty: Faculty): Observable<Faculty> {
    return this.http.put<Faculty>(`${this.base}/${id}`, faculty);
  }
  
  deleteFaculty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
