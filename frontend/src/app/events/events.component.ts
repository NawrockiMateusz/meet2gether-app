import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { EventsService } from './events.service';
import { Event } from './events.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  mockEventy: Event[] = [];
  filteredEvents: Event[] = [];
  searchQuery: string = '';
  searchLocation: string = '';
  searchDate: string = '';
  selectedCategory: number | null = null;
  searchDateStart: Date | null = null;
  searchDateEnd: Date | null = null;

  constructor(public eventsService: EventsService) {}

  ngOnInit(): void {
    this.mockEventy = this.eventsService.eventsMock;
    this.filteredEvents = this.mockEventy;
  }

  getCategoryNameById(categoryId: number): string {
    const category = this.eventsService.categoriesMock.find(
      (c) => c.id === categoryId
    );
    return category ? category.name : 'Nieznana kategoria';
  }

  getCategoryImageById(categoryId: number): string {
    const category = this.eventsService.categoriesMock.find(
      (c) => c.id === categoryId
    );
    return category ? category.image : 'default-image-path.jpg';
  }

  filterEvents(): void {
    this.filteredEvents = this.eventsService.eventsMock.filter((event) => {
      const eventDate = new Date(event.date);
      const startDate = this.searchDateStart
        ? new Date(this.searchDateStart)
        : null;
      const endDate = this.searchDateEnd ? new Date(this.searchDateEnd) : null;
      return (
        (!this.searchDateStart || eventDate >= startDate) &&
        (!this.searchDateEnd || eventDate <= endDate) &&
        event.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedCategory == null ||
          event.categoryId === this.selectedCategory) &&
        event.location
          .toLowerCase()
          .includes(this.searchLocation.toLowerCase()) &&
        (this.searchDate === '' ||
          new Date(event.date).toISOString().split('T')[0] === this.searchDate)
      );
    });
  }
}
