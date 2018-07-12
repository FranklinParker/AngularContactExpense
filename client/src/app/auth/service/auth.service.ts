import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {RegistrationModel} from "../model/registration-model";
import {LoggedInUser} from "../model/loggedInUser";
import {LoginResult} from "../model/loginResult";
import {BehaviorSubject, Observable} from "rxjs/index";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../reducers";
import {AttemptLogin, Login, Logout} from "../auth.actions";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = environment.apiUrl + 'register';
  private loginUrl = environment.apiUrl + 'login';

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<AppState>) {
  }


  /**
   * logout and navigate to login
   *
   *
   */
  logout(){
    this.store.dispatch(new Logout());
  }
  /**
   * login
   *
   *
   * @param {string} email
   * @param password
   * @returns {Promise<any>}
   */

  async login(email: string, password): Promise<{ success: boolean, message?: string}> {
    const body = {
      email,
      password
    };
    try {
      const result: { success: boolean, token?: string, user?: LoggedInUser, expiresInSeconds?: number }
      = await this.http.post<LoginResult>(this.loginUrl, body)
        .pipe(map((result: LoginResult) => {
          if (result.success) {
            const mapResult: { success: boolean, token: string,
              user: LoggedInUser, expiresInSeconds: number } = {
              success: true,
              token: result.token,
              expiresInSeconds: result.expiresInSeconds,
              user: {
                firstName: result.record.firstName,
                lastName: result.record.lastName,
                email: result.record.email,
                id: result.record._id
              }
            };
            return mapResult;
          }
          return result;
        })).toPromise();
      if (result.success) {
        this.store.dispatch(new Login({ loggedInUser: result.user, token: result.token,
          expiresInSeconds: result.expiresInSeconds}));
      }
      return result;
    } catch (e) {
      this.store.dispatch(new Logout());
      return {
        success: false,
        message: ' Authentication Failed - system error'
      };

    }
  }



  /**
   * gets token if it exists
   *
   */
  getToken(){
    return localStorage.getItem('token');
  }


  /**
   * registers a user
   *
   * @param data
   * @returns {Promise<any>}
   */
  async registerUser(data): Promise<any> {

    try {
      const result = await this.http
        .post<{ success: boolean, message?: string, record?: RegistrationModel }>(this.registerUrl, data)
        .pipe(map(result => {
          return result;
        })).toPromise();
      return result;
    } catch (e) {
      return {
        success: false,
        error: e
      };

    }
  }
}
