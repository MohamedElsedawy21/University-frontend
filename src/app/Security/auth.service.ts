// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { AuthRequest, AuthResponse, RegisterRequest } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'jwt';
  private readonly base = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(req: RegisterRequest): Observable<void> {
    return this.http.post<AuthResponse>(`${this.base}/register`, req).pipe(
      map(() => void 0)
    );
  }

  login(req: AuthRequest): Observable<void> {
    return this.http.post<AuthResponse>(`${this.base}/login`, req).pipe(
      tap(res => this.setToken(res.token)),
      map(() => void 0)
    );
  }

  logout(): void {
    this.clearToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return !this.isExpired(token);
  }


  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  private isExpired(token: string): boolean {
    try {
      const payload = this.parseJwt(token);
      if (!payload?.exp) return false;
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return false;
    }
  }
  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(json);
  }
  getUserRoles(): string[] {
  const token = this.getToken();
  if (!token) return [];
  try {
    const payload = this.parseJwt(token);
    return payload?.roles || [];
  } catch {
    return [];
  }
}

hasRole(role: string): boolean {
  return this.getUserRoles().includes(role);
}

}
