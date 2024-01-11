import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerUser(
    userData: Partial<{ username: string; email: string; password: string }>
  ) {
    const url = 'http://127.0.0.1:8000/api/register/';
    return this.http.post(url, userData);
  }
}
