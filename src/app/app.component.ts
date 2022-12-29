import { Component } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from './marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-leaflet-example';
}

