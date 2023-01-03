import { Component, AfterViewInit, OnInit  } from '@angular/core';
import Chart  from 'chart.js/auto';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';


const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map:any;
  public chart: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

  
      this.chart = new Chart("MyChart", {
        type: 'bar', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
                   '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
           datasets: [
            {
              label: "Sales",
              data: ['467','576', '572', '79', '92',
                   '574', '573', '576'],
              backgroundColor: 'blue'
            },
            {
              label: "Profit",
              data: ['542', '542', '536', '327', '17',
                     '0.00', '538', '541'],
              backgroundColor: 'limegreen'
            }  
          ]
        },
        
      });

    }
  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
  }
}
