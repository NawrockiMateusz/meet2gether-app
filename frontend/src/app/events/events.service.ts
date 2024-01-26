import { Injectable } from '@angular/core';
import { Category, Event } from './events.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('http://127.0.0.1:8000/api/events');
  }

  categories: Category[] = [
    {
      name: 'Konferencja',
    },
    { name: 'IT' },
    { name: 'nauka' },
    { name: 'jedzenie' },
    { name: 'imprezka' },
    { name: 'spacer' },
    { name: 'hackathon' },
    { name: 'paintball' },
    { name: 'gaming' },
  ];

  addEvent(eventData: any): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/events/', eventData);
  }

  getCategories() {
    return this.categories;
  }

  deleteEvent(eventId: number): Observable<any> {
    const url = `http://127.0.0.1:8000/api/delete_event/${eventId}`;
    return this.http.delete(url);
  }
}
