import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginActivo = true;

  constructor(private languageService: LanguageService) { }

  ngOnInit(): void {
  }

  toggleLogin() {
    this.loginActivo = !this.loginActivo;
  }

}
