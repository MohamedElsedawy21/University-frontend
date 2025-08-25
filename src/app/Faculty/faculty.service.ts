import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Faculty } from '../Faculty/faculty.model';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private base = 'http://localhost:8080/faculties';
  private facultiesSubject = new BehaviorSubject<Faculty[]>([]);
  private faculties$ = this.facultiesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.base).pipe(
      tap(list => this.facultiesSubject.next(list))
    );
  }

  getFaculties(): Observable<Faculty[]> {
    return this.faculties$;
  }
  addFaculty(faculty: Faculty): Observable<Faculty> {
    return this.http.post<Faculty>(this.base, faculty).pipe(
      tap(created => {
        const curr = this.facultiesSubject.value;
        this.facultiesSubject.next([...curr, created]);
      })
    );
  }
  getFacultyById(id: number): Observable<Faculty> {
    return this.http.get<Faculty>(`${this.base}/${id}`);
  }

  updateFaculty(faculty: Faculty): Observable<Faculty> {
  return this.http.put<Faculty>(`${this.base}/${faculty.facultyId}`, faculty).pipe(
    tap((updatedFaculty) => {
      const current = this.facultiesSubject.value;
      const updated = current.map(f =>
        f.facultyId === updatedFaculty.facultyId ? updatedFaculty : f
      );
      this.facultiesSubject.next(updated);
    })
  );
}


  deleteFaculty(id: number): Observable<void> {
  return this.http.delete<void>(`${this.base}/${id}`).pipe(
    tap(() => {
      const current = this.facultiesSubject.value;
      const updated = current.filter(f => f.facultyId !== id);
      this.facultiesSubject.next(updated);
    })
  );
}

}
