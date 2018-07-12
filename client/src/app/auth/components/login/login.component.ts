import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginError: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onFormKeyUp(){
    this.loginError = null;
  }
  /**
   * login
   *
   * @param {NgForm} form
   * @returns {Promise<void>}
   */
  async onLogin(form: NgForm){
    const loginData:{ email: string, password: string} = form.value;
    const result = await this.authService.login(loginData.email, loginData.password );
    if(!result.success){
      this.loginError = result.message;
    }
  }



}
