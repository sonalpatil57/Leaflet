import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder} from '@angular/forms';
import * as L from 'leaflet'; 
import { indexOf } from 'underscore';
  import {Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  private map1;
  private map2;
  private map3;
  private map4;
  private wmsLayer1;
  private wmsLayer2;
  private wmsLayer3;
  private initMap(): void {
    this.wmsLayer1 = L.tileLayer.wms('http://190.168.51.85:8085/geoserver/HSVP/wms?', {
    layers: 'HSVP:Buidings',
    format: 'image/png',
    transparent: true
    }).addTo(this.map4);
    var markar = L.marker([51.5, -0.09]).addTo(this.map4);  
  }

private initMap2(): void  {
    this.wmsLayer2 =   L.tileLayer.wms('http://190.168.51.85:8085/geoserver/HSVP/wms?', {
     layers: 'HSVP:Roads',
     format: 'image/png',
    transparent: true
     }).addTo(this.map4);
    var markar = L.marker([51.5, -0.09]).addTo(this.map4);       
}

private initMap3(): void {
    this.wmsLayer3 =  L.tileLayer.wms('http://190.168.51.85:8085/geoserver/HSVP/wms?', {
    layers: 'HSVP:Plot_Parcel',
    format: 'image/png',
    transparent: true
    }).addTo(this.map4);
    var markar = L.marker([51.5, -0.09]).addTo(this.map4);       
}
private initMap4(): void {
    this.map4 = L.map('map', {
    center: [28.3654, 77.2965],
    zoom: 12
    });
    const wmsLayer = L.tileLayer.wms('http://ows.mundialis.de/services/service?', {
    layers: 'TOPO-OSM-WMS',
    format: 'image/png',
transparent: true
    }).addTo(this.map4);
    var markar = L.marker([51.5, -0.09]).addTo(this.map4);  
  }

  constructor(){}

  ngAfterViewInit(): void {
      
  }

  title = 'htmlone';

  public map;
  public chart: any;

  public show:boolean = false;
  public buttonName:any = 'Show';
 
  options = [ 
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
    ];

    optionsArray: Array<any> = [];
  


  onChange(op:string, $target: EventTarget) {
    const ischecked = (<HTMLInputElement>$target).checked;

      var index = this.options.indexOf(op);
      /*this.optionsArray.push(op);*/
      
      if(index == 0){
        if(ischecked) {
          this.initMap();
        }
        else{
          this.map4.removeLayer(this.wmsLayer1);
        }
      }
      else if(index == 1){
        if(ischecked) {
          this.initMap2();
        }
        else{
          this.map4.removeLayer(this.wmsLayer2);
        }
      }
      else if(index == 2){
        if(ischecked) {
          this.initMap3();
        }
        else{
          this.map4.removeLayer(this.wmsLayer3);
        }
      }
      else if(index == 3){
        if(ischecked) {
          this.initMap4();
        }
        else{
          this.map4.remove();
        }
      }
  }

  createChart(){
  
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
      options: {
        aspectRatio:2.5
      }
      
    });
  }

}
