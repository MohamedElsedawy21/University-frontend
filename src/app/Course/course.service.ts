import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course} from '../Course/course.model';

@Injectable({
  providedIn: 'root' 
})
export class CourseService {

  private base = 'http://localhost:8080/courses';  
  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.base);
  }

  addCourse(course: Course): Observable<Course> {
  return this.http.post<Course>(this.base, course);
}

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.base}/${id}`);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.base}/${id}`, course);
  }
  
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
