import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { EventsService } from './events.service';
import { Category, Event } from './events.interface';
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
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchQuery: string = '';
  searchLocation: string = '';
  searchDate: string = '';
  selectedCategory: number | null = null;
  searchDateStart: Date | null = null;
  searchDateEnd: Date | null = null;

  constructor(public eventsService: EventsService) {}

  categories = [];
  availableCategories: Category[] = [];

  ngOnInit(): void {
    this.categories = this.eventsService.getCategories();
    this.eventsService.getEvents().subscribe((data) => {
      this.events = data;
      this.filteredEvents = data;
      this.availableCategories = this.getAvailableCategories();
    });
    this.categories = this.eventsService.getCategories();
  }

  getAvailableCategories(): Category[] {
    const usedCategoryNames = new Set(
      this.events.map((event) => event.category)
    );
    return this.categories.filter((category) =>
      usedCategoryNames.has(category.name)
    );
  }

  filterEvents(): void {
    this.filteredEvents = this.events.filter((event) => {
      const eventDate = new Date(event.date);
      const startDate = this.searchDateStart
        ? new Date(this.searchDateStart)
        : null;
      const endDate = this.searchDateEnd ? new Date(this.searchDateEnd) : null;
      const searchLower = this.searchQuery.toLowerCase();
      return (
        (!this.searchDateStart || eventDate >= startDate) &&
        (!this.searchDateEnd || eventDate <= endDate) &&
        (event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)) &&
        (this.selectedCategory == null ||
          event.category === this.selectedCategory) &&
        event.location
          .toLowerCase()
          .includes(this.searchLocation.toLowerCase()) &&
        (this.searchDate === '' ||
          new Date(event.date).toISOString().split('T')[0] === this.searchDate)
      );
    });
  }
}
