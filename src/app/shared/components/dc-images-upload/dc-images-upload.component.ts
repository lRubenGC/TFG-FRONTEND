import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DCButtonComponent } from '../dc-button/dc-button.component';
import { FileUrlPipe } from '../../pipes/file-url.pipe';

@Component({
  selector: 'dc-images-upload',
  standalone: true,
  templateUrl: './dc-images-upload.component.html',
  styleUrls: ['./dc-images-upload.component.scss'],
  imports: [CommonModule, TranslateModule, DCButtonComponent, FileUrlPipe],
})
export class DCImagesUploadComponent {
  @Output() imagesSelected = new EventEmitter<File[]>();
  @Output() errorEmitter = new EventEmitter<void>();
  images: File[] = [];

  onFileSelect(event: any) {
    const files = event.target.files;
    this.processFiles(files);
  }

  onDragOver(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDrop(event: any) {
    event.stopPropagation();
    event.preventDefault();
    const files = event.dataTransfer.files;
    this.processFiles(files);
  }

  processFiles(files: FileList) {
    if (this.images.length + files.length > 4) {
      this.errorEmitter.emit();
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file && file.type.startsWith('image/')) {
        this.images.push(file);
        this.imagesSelected.emit(this.images);
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.imagesSelected.emit(this.images);
  }
}
