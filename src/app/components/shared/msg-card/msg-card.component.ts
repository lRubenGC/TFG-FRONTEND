import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { msgCardInterface } from 'src/app/models/shared.interface';

@Component({
  selector: 'app-msg-card',
  templateUrl: './msg-card.component.html',
  styleUrls: ['./msg-card.component.css']
})
export class MsgCardComponent implements OnInit {

  @Input() config: msgCardInterface = {
    title: '',
    description: [''],
    button: false
  }

  constructor(private router: Router) { }

  ngOnInit(): void {}

  goTo(link: string) {
    if (this.config.buttonLink) {
      this.router.navigate([link]);
    }
  }

}
