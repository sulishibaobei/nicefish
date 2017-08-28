import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations/fade-in';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  animations:[ fadeIn ]
})
export class ChartComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }

}
