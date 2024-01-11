import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventsService } from '../events/events.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Category } from '../events/events.interface';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from '../auth.guard';
import { LoginService } from '../login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    NavComponent,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [LoginService, AuthGuard],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent implements OnInit {
  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  categories: Category[] = [];

  constructor(
    private eventsService: EventsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.eventsService.getCategories();
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventsService.addEvent(this.eventForm.value).subscribe(
        (response) => {
          this.snackBar.open('Event utworzony!', 'Zamknij', {
            duration: 1000,
          });
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        },
        () => {
          this.snackBar.open(`Wystąpił błąd`, 'Zamknij', {
            duration: 3000,
          });
        }
      );
    } else {
      this.eventForm.markAllAsTouched();
    }
  }
}
