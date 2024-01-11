import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { RegisterService } from './register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  hide = true;
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private registerService: RegisterService,
    private snackBar: MatSnackBar
  ) {}

  submit() {
    if (this.registerForm.valid) {
      this.registerService.registerUser(this.registerForm.value).subscribe(
        (response) => {
          this.snackBar.open('Rejestracja powiodła się!', 'Zamknij', {
            duration: 3000,
          });
        },
        () => {
          this.snackBar.open(
            `Wystąpił błąd z rejestracją, sprawdź dane.`,
            'Zamknij',
            {
              duration: 3000,
            }
          );
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
