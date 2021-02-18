import { Injectable } from '@angular/core';


import { FormComponent } from '../form/form.component';

@Injectable({
  providedIn: 'any'
})
export class LoginService{

  details: any;
  constructor() { }

  storeCredentials(data: any, email: string, rememberMe: boolean): void{
    console.log(data, rememberMe);
    this.details = JSON.stringify({...data, email: email});
    rememberMe ? window.localStorage.setItem('details', this.details) : window.sessionStorage.setItem('details', this.details);  
  }

  getCredentials(): void{
    this.details = localStorage.getItem('details') ? localStorage.getItem('details') : sessionStorage.getItem('details');
    return JSON.parse(this.details);
  }

  logout(): void{
    localStorage.removeItem("details");
    sessionStorage.removeItem("details");
  }

}
