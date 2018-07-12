import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {RegistrationModel} from "../../model/registration-model";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  passwordMinLength = 8;
  passwordMatch = '';
  registrationError: string;

  registrant: RegistrationModel = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onFormKeyUp(){
    this.registrationError = null;
  }
  /**
   *  registers the user
   *
   * @param {NgForm} form
   */
  async onSignup(form: NgForm) {
    const result = await this.authService.registerUser(this.registrant);
    if (result.success) {
      this.authService.login(this.registrant.email, this.registrant.password);
    }else{
      this.registrationError = result.message;
    }
  }

  /**
   * checks if passwords do not match
   *
   *
   * @returns {boolean}
   */
  get passwordsDoNotMatch() {
    if (this.registrant.password.length >= this.passwordMinLength &&
      this.registrant.password !== this.passwordMatch) {
      return true
    } else {
      return false;
    }
  }


  get passwordsMatch() {
    if (this.registrant.password.length >= this.passwordMinLength &&
      this.registrant.password === this.passwordMatch
      && !this.registrationError) {
      return true
    } else {
      return false;
    }
  }


}
