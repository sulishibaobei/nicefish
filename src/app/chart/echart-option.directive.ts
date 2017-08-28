 import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Directive({
    selector: 'echart'
})
export class EChartOptionDirective1 implements OnInit {
    @Input('chartType') chartType: any;  //给chartType命一个别名 input 出去

    constructor(private el: ElementRef) {}

    public ngOnInit(): void {
        echarts.init(this.el.nativeElement).setOption(this.chartType);
    }
}