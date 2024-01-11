import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { EventsComponent } from '../events/events.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [NavComponent, EventsComponent, HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {}
