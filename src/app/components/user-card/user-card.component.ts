import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { userInterface } from 'src/app/models/user.interface';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user!: userInterface;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  visitUser() {
    this.router.navigate([`/user/profile/${this.user.username}`]);
  }


}
