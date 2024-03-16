import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'privacy-policies',
  templateUrl: './privacy-policies.component.html',
  styleUrls: ['./privacy-policies.component.scss'],
})
export class PrivacyPoliciesComponent {
  @ViewChildren('firstWordStrong') firstWordStrong!: QueryList<ElementRef>;
  ngAfterViewInit() {
    this.firstWordStrong.forEach((element: ElementRef) => {
      const words = element.nativeElement.textContent.split(' ');
      words[0] = '<span style="font-weight: 600;">' + words[0] + '</span>';
      element.nativeElement.innerHTML = words.join(' ');
    });
  }
}
