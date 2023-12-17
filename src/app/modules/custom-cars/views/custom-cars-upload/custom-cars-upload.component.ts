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
    // TODO: Manejar correctamente la respuesta del back
    if (this.carForm.valid) {
      this.customCarsService.uploadCar(this.carForm.value).subscribe({
        next: (response) => console.log('Respuesta del servidor:', response),
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

  private async showToast(toastObject: ITOAST_OBJECT) {
    const summaryT = this.translate.get(toastObject.summary);
    const summary = await lastValueFrom(summaryT);

    const detailT = this.translate.get(toastObject.detail);
    const detail = await lastValueFrom(detailT);

    this.messageService.add({
      key: 'br',
      severity: toastObject.severity,
      summary,
      detail,
      life: 3000,
    });
  }
}
