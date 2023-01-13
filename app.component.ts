import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS.js';
import * as $ from "jquery";
import Chart from 'chart.js/auto';
import  {transform}  from 'ol/proj';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  map: Map = new Map;
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    /* this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
*/
    this.createChart();
    this.dtOptions = {
      paging: false,
      scrollY: 150,
      scrollX: true
    };

    const wmsSource = new TileWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: {'LAYERS': 'ne:ne', 'TILED': true},
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
    });

    const wmsLayer = new TileLayer({
      source: wmsSource
    });

    const wmsSourceHSVPPlotParcel = new TileWMS({
      url: 'http://190.168.51.85:8085/geoserver/HSVP/wms',
      params: {'LAYERS': 'HSVP:Plot_Parcel', 'TILED': false},
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
    });

    const wmsLayerHSVPPlotParcel = new TileLayer({
      source: wmsSourceHSVPPlotParcel
    });

    const view = new View({
      center:transform([77.2965,28.3654],"EPSG:4326","EPSG:3857"),
      // center: [77.2965,28.3654],
      zoom: 11,
    });
        
    const map = new Map({
      layers: [wmsLayer],
      target: 'map',
      view: view,
    });
        
    map.addLayer(wmsLayerHSVPPlotParcel);

    

    map.on('singleclick', function (evt) {
      (<HTMLInputElement>document.getElementById('info')).innerHTML = '';
      const data = wmsLayer.getData(evt.pixel);
      const viewResolution = view.getResolution() as number;

      console.log(viewResolution);
      const url = wmsSource.getFeatureInfoUrl(
        evt.coordinate,
        viewResolution,
        'EPSG:3857',
        {'INFO_FORMAT': 'text/html'}
      );
      if (url) {
        fetch(url)
          .then((response) => response.text())
          .then((html) => {
            (<HTMLInputElement>document.getElementById('info')).innerHTML = html;
          });
      }
    });
  
  }

  public chart: any;

  ReadMore:boolean = true
  visible:boolean = false

  visible1:boolean = false

  public show:boolean = false;
  public buttonName:any = 'Show';
 
  options = [ 
    "Option 1",
    "Option 2",
    "Option 3"
  ];

  optionsArray: Array<any> = [];
  
  onChange(op:string, $target: EventTarget) {

    const ischecked = (<HTMLInputElement>$target).checked;
    var index = this.options.indexOf(op);
    this.optionsArray.push(op);
    var index = this.options.indexOf(op);
    if(index == 0){
      if(ischecked){
        this.visible1 = !this.visible1;
      }
      else{
        this.visible1 = !this.visible1;
      }
    }
  }

  onclick(op:string, $target: EventTarget) {
    this.visible = !this.visible;
    this.ReadMore = !this.ReadMore;
  }

    createChart(){
      var xValues = ["GIS_Plot_S", "Vacant", "Allotted", "Encroachment", "Open Space"];
      var yValues = [55, 49, 44, 24, 15];
      var barColors = ["red", "green","blue","orange","brown"];
      this.chart = new Chart("MyChart",  {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false,
            }
          },
          aspectRatio:1.1
        }
      });
    }
}