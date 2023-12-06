import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'dc-button',
  standalone: true,
  templateUrl: './dc-button.component.html',
  styleUrls: ['./dc-button.component.css'],
  imports: [TranslateModule],
})
export class DCButtonComponent {
  @Input() buttonTitle: string = '';
  @Input() buttonHref?: string = '';
  @Input() buttonDisabled?: boolean = false;

  constructor(private router: Router) {}

  public goTo(): void {
    if (this.buttonHref) {
      this.router.navigate([this.buttonHref]);
    }
  }
}
