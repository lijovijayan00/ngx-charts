import { Component, Input, Output, EventEmitter } from '@angular/core';
import d3 from 'd3';
import { YAxisTicks } from './YAxisTicks.js';
import { AxisLabel } from './AxisLabel.js';

@Component({
  selector: 'g[y-axis]',
  directives: [YAxisTicks, AxisLabel],
  template: `
    <svg:g
      [attr.class]="yAxisClassName"
      [attr.transform]="transform">
      <svg:g y-axis-ticks
        [tickFormatting]="tickFormatting"
        [tickArguments]="tickArguments"
        [tickStroke]="tickStroke"
        [scale]="yScale"
        [orient]="yOrient"
        [showGridLines]="showGridLines"
        [gridLineHeight]="dims.height"
      />

      <svg:g axis-label
        *ngIf="showLabel"
        [label]="labelText"
        [offset]="80"
        [orient]="'left'"
        [height]="dims.height"
        [width]="dims.width">
      </svg:g>
    </svg:g>
  `
})
export class YAxis {
  @Input() yScale;
  @Input() dims;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() showLabel;
  @Input() labelText;
  @Input() yAxisTickInterval;

  constructor(){
    Object.assign(this, {
      yAxisClassName: 'y axis',
      yOrient: 'left',
      fill: 'none',
      stroke: '#ccc',
      tickStroke: '#ccc',
      strokeWidth: '1',
      yAxisOffset: -5,
    });
  }

  ngOnInit() {
    this.update();
  }

  update(){
    this.offset = this.yAxisOffset;
    if (this.yOrient === 'right') {
       this.transform = `translate(${this.offset + this.dims.width} , 0)`;
    } else {
       this.transform = `translate(${this.offset} , 0)`;
    }

    if (typeof this.yAxisTickCount !== 'undefined') {
      this.tickArguments = [this.yAxisTickCount];
    }

    if (typeof this.yAxisTickInterval !== 'undefined') {
      this.tickArguments = [d3.time[this.yAxisTickInterval.unit], this.yAxisTickInterval.interval];
    }
  }

}