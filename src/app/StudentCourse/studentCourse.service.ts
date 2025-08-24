import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentCourse } from '../StudentCourse/studentCourse.model';

@Injectable({
  providedIn: 'root' 
})
export class StudentCourseService {

  private base = 'http://localhost:8080/student-courses';
  
  constructor(private http: HttpClient) { }

  getStudentCourses(): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(this.base);
  }

  addStudentCourse(studentcourse: StudentCourse): Observable<StudentCourse> {
  return this.http.post<StudentCourse>(this.base, studentcourse);
}

  getStudentCourseById(id: number): Observable<StudentCourse> {
    return this.http.get<StudentCourse>(`${this.base}/${id}`);
  }

  updateStudentCourse(id: number, studentcourse: StudentCourse): Observable<StudentCourse> {
    return this.http.put<StudentCourse>(`${this.base}/${id}`, studentcourse);
  }
  
  deleteStudentCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
