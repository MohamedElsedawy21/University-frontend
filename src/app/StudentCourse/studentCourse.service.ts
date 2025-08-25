import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { StudentCourse } from '../StudentCourse/studentCourse.model';

@Injectable({
  providedIn: 'root' 
})
export class StudentCourseService {

  private base = 'http://localhost:8080/student-courses';
  private studentCoursesSubject = new BehaviorSubject<StudentCourse[]>([]);
  studentCourses$ = this.studentCoursesSubject.asObservable();

  constructor(private http: HttpClient) { }
  
  getStudentCourses(): Observable<StudentCourse[]> {
    return this.http.get<StudentCourse[]>(this.base).pipe(
      tap(courses => this.studentCoursesSubject.next(courses))
    );
  }

  addStudentCourse(studentcourse: StudentCourse): Observable<StudentCourse> {
    return this.http.post<StudentCourse>(this.base, studentcourse).pipe(
      tap(newCourse => {
        const current = this.studentCoursesSubject.value;
        this.studentCoursesSubject.next([...current, newCourse]);
      })
    );
  }

  getStudentCourseById(id: number): Observable<StudentCourse> {
    return this.http.get<StudentCourse>(`${this.base}/${id}`);
  }

  updateStudentCourse(id: number, studentcourse: StudentCourse): Observable<StudentCourse> {
    return this.http.put<StudentCourse>(`${this.base}/${id}`, studentcourse).pipe(
      tap(updated => {
        const current = this.studentCoursesSubject.value;
        const index = current.findIndex(sc => sc.studentId === updated.studentId && sc.courseId === updated.courseId);
        if (index !== -1) {
          current[index] = updated;
          this.studentCoursesSubject.next([...current]);
        }
      })
    );
  }

  deleteStudentCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`).pipe(
      tap(() => {
        const current = this.studentCoursesSubject.value;
        this.studentCoursesSubject.next(current.filter(sc => sc.studentId !== id));
      })
    );
  }
}
