import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { lastValueFrom } from 'rxjs';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { ICUSTOM_CAR } from '../../models/custom-cars.models';
import { CustomCarsService } from '../../services/custom-cars.service';

@Component({
  selector: 'custom-car-detailed',
  templateUrl: './custom-car-detailed.component.html',
  styleUrls: ['./custom-car-detailed.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, GalleriaModule, RouterModule],
})
export class CustomCarDetailedComponent implements OnInit {
  public car!: ICUSTOM_CAR;
  public numVisible: number = 4;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private messageService: MessageService,
    private translate: TranslateService,
    private customCarsService: CustomCarsService
  ) {}

  async ngOnInit() {
    this.car = this.config.data.car;
    if (window.innerWidth <= 600) this.numVisible = 2;
  }

  upvoteCar(carId: number) {
    this.customCarsService.upvoteCar(carId).subscribe({
      next: (resp) => {
        if (resp.ok) {
          this.car.isVoted = true;
          this.car.upvotes++;
          this.showToast({
            severity: 'success',
            summary: 'toast.success',
            detail: 'toast.car_upvoted',
          });
        }
      },
      error: (error) => {
        this.showToast({
          severity: 'error',
          summary: 'toast.error',
          detail: 'toast.not_logged_in',
        });
      },
    });
  }

  downvoteCar(carId: number) {
    this.customCarsService.downvoteCar(carId).subscribe({
      next: (resp) => {
        if (resp.ok) {
          this.car.isVoted = false;
          this.car.upvotes--;
          this.showToast({
            severity: 'success',
            summary: 'toast.success',
            detail: 'toast.car_downvoted',
          });
        }
      },
      error: (error) => {
        this.showToast({
          severity: 'error',
          summary: 'toast.error',
          detail: 'toast.not_logged_in',
        });
      },
    });
  }

  public async showToast(toastObject: ITOAST_OBJECT) {
    const summaryT = this.translate.get(toastObject.summary);
    const summary = await lastValueFrom(summaryT);

    const detailT = this.translate.get(toastObject.detail);
    const detail = await lastValueFrom(detailT);

    this.messageService.add({
      key: 'br',
      severity: toastObject.severity,
      summary: summary,
      detail: detail,
      life: 2000,
    });
  }
}
