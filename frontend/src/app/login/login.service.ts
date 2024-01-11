import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(public http: HttpClient) {}

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
    localStorage.removeItem('username');
  }
}
