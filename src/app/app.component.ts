import { Component, OnInit } from '@angular/core';

import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loggedIn: any;

  constructor(
    private loginService: LoginService,
  ){}

  ngOnInit(): void {
    this.loggedIn = this.loginService.getCredentials();
    console.log(this.loggedIn);
  }

  logout(): void{
    this.loginService.logout();
    window.location.reload();
  }
  
}
