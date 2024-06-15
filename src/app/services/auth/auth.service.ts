import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'app/types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://api.escuelajs.co/api/v1';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn.next(this.isAuthenticated());
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.access_token) {
            localStorage.setItem('auth_token', response.access_token);
            this.loggedIn.next(true);
          }
        }),
        tap(() => this.fetchAndStoreProfile())
      );
  }

  fetchAndStoreProfile(): void {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<User>(`${this.baseUrl}/auth/profile`, { headers }).subscribe(
      (profile) => {
        localStorage.setItem('user_profile', JSON.stringify(profile));
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_profile');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  signup(name: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/users`;
    const body = {
      name,
      email,
      password,
      avatar: 'https://picsum.photos/800',
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(url, body, httpOptions);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
