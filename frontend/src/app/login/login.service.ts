import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  loginUser(
    userData: Partial<{ username: string; email: string; password: string }>
  ) {
    const url = 'http://127.0.0.1:8000/api/login/';
    return this.http.post(url, userData).pipe(
      tap((response: any) => {
        localStorage.setItem('username', response.username);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  logout() {
    this.http.post('http://127.0.0.1:8000/api/logout/', {}).subscribe(
      () => {
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Wystąpił błąd podczas wylogowania', error);
      }
    );
  }
}
