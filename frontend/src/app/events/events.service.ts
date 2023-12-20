import { Injectable } from '@angular/core';
import { Category, Event } from './events.interface';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  categoriesMock: Category[] = [
    {
      id: 1,
      name: 'Konferencja',
      image: 'assets/images/konferencja.jpg',
    },
    { id: 2, name: 'Warsztat', image: 'assets/images/warsztat.jpg' },
  ];

  eventsMock: Event[] = [
    {
      id: 1,
      categoryId: 1,
      name: 'Angular Connect',
      location: 'Londyn',
      date: new Date(2023, 9, 23),
      description: 'Lorem ipsum ...',
    },
    {
      id: 2,
      categoryId: 2,
      name: 'Warsztaty Front-endowe',
      location: 'Kraków',
      date: new Date(2023, 10, 14),
      description: 'Lorem ipsum ...',
    },
  ];

  addEvent(eventData) {
    const newEvent: Event = {
      id: this.generateId(),
      ...eventData,
    };
    this.eventsMock.push(newEvent);
  }

  private generateId(): number {
    return this.eventsMock.length > 0
      ? Math.max(...this.eventsMock.map((e) => e.id)) + 1
      : 1;
  }

  getCategories(): Category[] {
    return this.categoriesMock;
  }
}
