import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IBASIC_CAR } from '../../models/basic-cars-shared.models';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'dc-basic-car-detailed',
  standalone: true,
  templateUrl: './dc-basic-car-detailed.component.html',
  styleUrls: ['./dc-basic-car-detailed.component.scss'],
  imports: [CommonModule],
})
export class DcBasicCarDetailedComponent implements OnInit {
  public car!: IBASIC_CAR;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}
  ngOnInit(): void {
    this.car = this.config.data.car;
  }
}
