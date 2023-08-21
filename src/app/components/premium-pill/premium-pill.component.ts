import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { premiumPillInterface } from 'src/app/models/premium.interface';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-premium-pill',
  templateUrl: './premium-pill.component.html',
  styleUrls: ['./premium-pill.component.css']
})
export class PremiumPillComponent implements OnInit {

  @Input() data!: premiumPillInterface;

  @Output() serieSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
  }

  showPremiumCars(serie: string) {
    this.loaderService.startLoading();
    this.serieSelected.emit(serie);
  }

}
