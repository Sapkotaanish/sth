import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  loading: boolean = false;
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  loginForm = this.fromBuilder.group({
    email: '',
    password: ''
  })

  constructor(
    private fromBuilder: FormBuilder,
    private http: HttpClient,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.submitForm();
  }

  toggleRemember() : void{
    console.log('toggle');
    this.rememberMe = !this.rememberMe;
  }

  submitForm(): void{
    this.loading = true;
    this.http.post<any>('https://reqres.in/api/login', { email: this.email, password: this.password})
    .subscribe({ 
      next: data => {
        this.loginService.storeCredentials(data, this.email, this.rememberMe);
        this.loading = false;
        window.location.reload();
      },
      error: error => {
        console.log(error);
        this.loading = false;
      }  
    })
  }
}
