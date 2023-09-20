import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { LoaderService } from 'src/app/services/loader.service';
import { DetailedCarService } from './detailed-car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-car-page',
  templateUrl: './detailed-car-page.component.html',
  styleUrls: ['./detailed-car-page.component.css']
})
export class DetailedCarPageComponent implements OnInit {

  userToken!: tokenObject;
  carId!: string | null;


  constructor(
    private detailedCarService: DetailedCarService,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {}

  async ngOnInit() {
    this.userToken = await decodeToken();
    this.carId = this.route.snapshot.paramMap.get('id');

    this.getCar();
  }

  getCar() {
    // const car = this.detailedCarService.getCarById(this.carId);
  }

}
