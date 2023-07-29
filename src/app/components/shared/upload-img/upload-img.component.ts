import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss'],
})
export class UploadImgComponent implements OnInit {

  @Input() imagePrev: string | undefined | null = '';
  @Input() imageBanner: boolean = false;
  @Input() deleteImage!: boolean;
  @Input() displayUploadButton: boolean = false;
  @Output() imageChanged = new EventEmitter<File | null>();
  previewUrl!: string | ArrayBuffer | null | undefined;
  
  ngOnInit(): void {
    if (this.imagePrev !== '') {
      this.previewUrl = this.imagePrev;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['deleteImage'] && changes['deleteImage'].currentValue) {
      this.onDeleteImage();
      this.deleteImage = false;
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
