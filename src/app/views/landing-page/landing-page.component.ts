import { Component, OnInit } from '@angular/core';
import { landingCardInterface } from 'src/app/models/landingPage.interface';
import { msgCardInterface } from 'src/app/models/shared.interface';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  landingCards: landingCardInterface[] = [
    {
      backgroundImg: '../../../assets/landing_page/basic_bg.png',
      popImg: '../../../assets/landing_page/basic_pop.png',
      linkTo: 'basic-cars',
      title: 'Basic'
    },
    {
      backgroundImg: '../../../assets/landing_page/premium_bg.png',
      popImg: '../../../assets/landing_page/premium_pop.png',
      linkTo: 'premium-cars',
      title: 'Premium'
    },
    {
      backgroundImg: '../../../assets/landing_page/custom_bg.png',
      popImg: '../../../assets/landing_page/custom_pop.png',
      linkTo: 'custom-cars',
      title: 'Custom'
    }
  ]


  msg_card: msgCardInterface = {
    // Bienvenido a Cold Wheels
    title: 'Welcome to Cold Wheels',
    // Una aplicacion web para coleccionistas creada por otro coleccionista. Haz clic en las imágenes de abajo para ver los distintos tipos de coches. Aquí podrás registrar tu colección o añadir coches a tu lista de deseados. Estas listas son públicas, por lo que podrás compartirlas. También podrás subir tus coches personalizados y ver los de los demás.
    description: ['A web application for collectors created by another collector', 'Click on the images below to see the different types of cars', 'Here you can register your collection or add cars to your wish list. These lists are public, so you can share them', 'You will also be able to upload your custom cars and see those of others'],
    button: true,
    buttonName: 'Sign Up'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
