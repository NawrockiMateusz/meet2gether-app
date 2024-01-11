//here we want write all logic about login

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginUser(
    userData: Partial<{ username: string; email: string; password: string }>
  ) {
    const url = 'http://127.0.0.1:8000/api/login/';
    return this.http.post(url, userData);
  }
}
