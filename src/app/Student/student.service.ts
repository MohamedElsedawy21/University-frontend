import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/students';

  private studentsSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadStudents(): void {
    this.http.get<Student[]>(this.baseUrl).subscribe({
      next: (data) => this.studentsSubject.next(data),
      error: (err) => console.error('Error fetching students:', err),
    });
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student).pipe(
      tap(() => this.loadStudents())
    );
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${id}`, student).pipe(
      tap(() => this.loadStudents())
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.loadStudents())
    );
  }
}
