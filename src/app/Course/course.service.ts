import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Course } from '../Course/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private base = 'http://localhost:8080/courses';
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.base).pipe(
      tap(courses => this.coursesSubject.next(courses))
    );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.base, course).pipe(
      tap(newCourse => {
        const current = this.coursesSubject.value;
        this.coursesSubject.next([...current, newCourse]);
      })
    );
  }
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.base}/${id}`);
  }
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.base}/${course.courseId}`, course).pipe(
      tap(updatedCourse => {
        const current = this.coursesSubject.value;
        const updated = current.map(c =>
          c.courseId === updatedCourse.courseId ? updatedCourse : c
        );
        this.coursesSubject.next(updated);
      })
    );
  }
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`).pipe(
      tap(() => {
        const current = this.coursesSubject.value;
        this.coursesSubject.next(current.filter(c => c.courseId !== id));
      })
    );
  }
}
