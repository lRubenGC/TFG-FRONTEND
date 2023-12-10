import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'custom-car-detailed',
  templateUrl: './custom-car-detailed.component.html',
  styleUrls: ['./custom-car-detailed.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CustomCarDetailedComponent {}
