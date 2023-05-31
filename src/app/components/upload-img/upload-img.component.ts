import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss'],
})
export class UploadImgComponent implements OnInit {

  @Input() imagePrev: string | undefined = '';
  @Input() imageBanner: boolean = false;
  @Output() imageChanged = new EventEmitter<File | null>();
  previewUrl!: string | ArrayBuffer | null | undefined;
  
  ngOnInit(): void {
    if (this.imagePrev !== '') {
      this.previewUrl = this.imagePrev;
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement
    if (target && target.files) {
      const file = target.files[0];
      
      if (file) {
        this.imageChanged.emit(file);
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  
  }
  onDeleteImage() {
    this.previewUrl = null;
    this.imageChanged.emit(null);
  }
}
