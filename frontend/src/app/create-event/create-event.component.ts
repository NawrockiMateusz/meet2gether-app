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
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private eventsService: EventsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categories = this.eventsService.getCategories();
    this.eventForm = new FormGroup({
      name: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventsService.addEvent(this.eventForm.value);
      this.eventForm.reset();
      Object.keys(this.eventForm.controls).forEach((key) => {
        this.eventForm.get(key).setErrors(null);
        this.eventForm.get(key).markAsPristine();
        this.eventForm.get(key).markAsUntouched();
      });
      this.snackBar.open('Event added successfully!', 'Close', {
        duration: 3000,
      });
    }
  }
}
