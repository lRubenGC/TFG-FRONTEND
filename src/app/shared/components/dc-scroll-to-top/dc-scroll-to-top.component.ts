import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'dc-scroll-to-top',
  templateUrl: './dc-scroll-to-top.component.html',
  standalone: true,
  styleUrls: ['./dc-scroll-to-top.component.scss'],
  imports: [CommonModule],
})
export class DcScrollToTopComponent {
  isVisible = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any): void {
    this.isVisible = window.pageYOffset > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
