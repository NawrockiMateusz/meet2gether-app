import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavComponent, EventsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
