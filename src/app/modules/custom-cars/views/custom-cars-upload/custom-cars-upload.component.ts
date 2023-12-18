import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomCarsService } from '../../services/custom-cars.service';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { minArrayLength } from 'src/app/shared/functions/formValidators';

@Component({
  selector: 'custom-cars-upload',
  templateUrl: './custom-cars-upload.component.html',
  styleUrls: ['./custom-cars-upload.component.scss'],
})
export class CustomCarsUploadView implements OnInit {
  carForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customCarsService: CustomCarsService,
    private translate: TranslateService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carForm = this.fb.group({
      model_name: ['', Validators.required],
      imgs: this.fb.array([], minArrayLength(1)),
    });
  }

  get imgs(): FormArray {
    return this.carForm.get('imgs') as FormArray;
  }

  onImagesSelected(imgs: File[]) {
    this.imgs.clear();
    imgs.forEach((image) => this.imgs.push(this.fb.control(image)));
  }

  onErrorEmit() {
    this.showToast({
      severity: 'error',
      summary: 'toast.error',
      detail: 'toast.more_than_four_imgs',
    });
  }

  submitForm() {
    if (this.carForm.valid) {
      this.customCarsService.uploadCar(this.carForm.value).subscribe({
        next: (resp) => {
          if (resp.ok) {
            this.showToast({
              severity: 'success',
              summary: 'toast.success',
              detail: 'toast.car_successfully_created',
            });
            if (resp.invalidImages) {
              resp.invalidImages.forEach((img: string) => {
                this.showToast(
                  {
                    severity: 'error',
                    summary: 'toast.error',
                    detail: 'toast.invalid_format',
                  },
                  6000,
                  img,
                  resp.validFormats
                );
              });
            }
            // TODO: Invalidar el botón de subir coche y añadir elemento HTML para que acceda a su coche
          } else if (!resp.ok && !!resp.validFormats) {
            this.showToast({
              severity: 'error',
              summary: 'toast.error',
              detail: 'toast.at_least_one_image',
            });
          }
        },
        error: (error) => console.error('Error:', error),
      });
    } else {
      this.showToast({
        severity: 'error',
        summary: 'toast.error',
        detail: 'toast.custom_car_fields_required',
      });
    }
  }

  private async showToast(
    toastObject: ITOAST_OBJECT,
    life?: number,
    img?: string,
    formats?: string[]
  ) {
    const summaryT = this.translate.get(toastObject.summary);
    const summary = await lastValueFrom(summaryT);

    const detailT = this.translate.get(toastObject.detail);
    let detail = await lastValueFrom(detailT);

    if (img && formats) {
      const invalid_formatT = this.translate.get('toast.invalid_format');
      const invalid_format = await lastValueFrom(invalid_formatT);
      const valid_formatsT = this.translate.get('toast.valid_formats');
      const valid_formats = await lastValueFrom(valid_formatsT);
      detail = `${invalid_format}: ${img} ... ${valid_formats}: ${formats}`;
    }

    this.messageService.add({
      key: 'br',
      severity: toastObject.severity,
      summary,
      detail,
      life: life ?? 3000,
    });
  }
}
