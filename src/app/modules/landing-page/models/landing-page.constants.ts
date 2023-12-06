import { ILANDING_CARDS, ITEXT_CARD } from './landing-page.models';

export const LANDING_CARDS: ILANDING_CARDS[] = [
  {
    title: 'landing_page.cards.basic_cars',
    backgroundImg: 'assets/images/landing_page/cards/basic_bg.webp',
    popImg: 'assets/images/landing_page/cards/basic_pop.webp',
    linkTo: 'basic-cars',
  },
  {
    title: 'landing_page.cards.premium_cars',
    backgroundImg: 'assets/images/landing_page/cards/premium_bg.webp',
    popImg: 'assets/images/landing_page/cards/premium_pop.webp',
    linkTo: 'premium-cars',
  },
  {
    title: 'landing_page.cards.custom_cars',
    backgroundImg: 'assets/images/landing_page/cards/custom_bg.webp',
    popImg: 'assets/images/landing_page/cards/custom_pop.webp',
    linkTo: 'custom-cars',
  },
];

export const TEXT_CARD: ITEXT_CARD = {
  title: 'landing_page.text_card.title',
  text: 'landing_page.text_card.text',
  buttonTitle: 'landing_page.text_card.button.title',
  buttonHref: '/auth'
}