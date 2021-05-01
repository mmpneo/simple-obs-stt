import {AfterViewInit, ChangeDetectionStrategy, Component, Input, NgModule, OnInit} from '@angular/core';
import {CommonModule}                                                               from "@angular/common";

@Component({
  selector:        'app-radial-progress',
  templateUrl:     './radial-progress.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadialProgressComponent implements OnInit, AfterViewInit {
  constructor() {}

  radius       = 8;
  borderRadius = 4;

  strokeDasharray = '';
  pX              = 0;
  circlePosition  = 0;
  elementSize     = 0;

  private _progress: number = 0;
  @Input() set progress(value: number) {
    this.strokeDasharray = `${this.pX * value / 100} ${this.pX}`;
    this._progress       = value;
  }
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.pX             = 2 * Math.PI * this.radius;
    this.circlePosition = this.borderRadius / 2 + this.radius;
    this.elementSize    = this.radius * 2 + this.borderRadius;
  }

}

@NgModule({
  declarations: [RadialProgressComponent],
  exports:      [RadialProgressComponent],
  imports:      [CommonModule]
})
export class RadialProgressModule {
}
