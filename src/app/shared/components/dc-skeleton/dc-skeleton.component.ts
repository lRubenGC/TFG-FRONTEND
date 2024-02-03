import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';
import { DcDividerComponent } from '../dc-divider/dc-divider.component';

@Component({
  selector: 'dc-skeleton',
  standalone: true,
  templateUrl: './dc-skeleton.component.html',
  styleUrls: ['./dc-skeleton.component.scss'],
  imports: [CommonModule, TranslateModule, SkeletonModule, DcDividerComponent],
})
export class DCSkeletonComponent {
  @Input() basicCarsSection: boolean = false;
  @Input() premiumCarsSection: boolean = false;
  public backgroundColor = '#575757';
}
