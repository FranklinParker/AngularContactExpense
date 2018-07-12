import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {ofType} from "@ngrx/effects";
import { AuthActionTypes, LoggedInInfo, Login, Logout} from "./auth.actions";
import {tap} from 'rxjs/operators'
import {Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {AppState} from "../reducers";
import {isLoggedOut } from "./auth.selector";
import {catchError, filter, map,  withLatestFrom} from "rxjs/internal/operators";
import { throwError} from "rxjs/index";
import {LoggedInUser} from "./model/loggedInUser";


@Injectable()
export class AuthEffects {

  @Effect()
  attemptLogin$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.AttemptLoginAction),
    withLatestFrom(this.store.pipe(select(isLoggedOut))),
    filter(([action, isLoggedOut]) => isLoggedOut),
    map(result => {
      console.log('got to attempt login', result);
      const logInInfo: LoggedInInfo = this.getLoginInfoIfExists();
      if(logInInfo){
        return new Login(logInInfo);
      }else{
        return new Logout();
      }
    }),
    catchError(err => {
      console.log('error attempting login ', err);
      return throwError(err);
    })
  );
  @Effect({dispatch: false})
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => {
      this.setTokenUser(action.payload)
      this.router.navigate(['/']);

    })
  );
  @Effect({dispatch: false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(action => {
      localStorage.clear();
      clearTimeout(this.tokenTimer);
      this.router.navigate(['/login']);

    })
  );
  //end of effects
  /**
   * class variables
   *
   */
  private tokenTimer;

  constructor(private actions$: Actions,
              private router: Router,
              private store: Store<AppState>) {
  }

  /**
   *
   *
   * @param {{token: string; user: LoggedInUser}} result
   */
  private setTokenUser(payload: LoggedInInfo) {
    const currTime = new Date().getTime();
    this.setAuthTimer(payload.expiresInSeconds * 1000);
    const expiresInTime = currTime + (payload.expiresInSeconds * 1000);
    localStorage.setItem('loggedInUser', JSON.stringify(payload.loggedInUser));
    localStorage.setItem('token', payload.token);
    localStorage.setItem('expiresIn', '' + expiresInTime);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      console.log("automatic timeout in store ");
      this.store.dispatch(new Logout());
    }, duration);
  }

  /**
   * try to get login info if exists
   */
  private getLoginInfoIfExists(): LoggedInInfo  {
    const authData = this.getAuthData();
    if (!authData) {
      return;
    }
    const currTime = new Date().getTime();
    const expiresTime = authData.expiresIn - currTime;
    if(expiresTime > 0){
      const loggedInUser: LoggedInUser = this.getUserLoggedInUser();

      return { loggedInUser: loggedInUser, token: authData.token,
        expiresInSeconds: expiresTime/1000};
    }else{
      return null;
    }

  }

  /**
   * get loggedInUser from local storage
   *
   * @returns {LoggedInUser}
   */

  private getUserLoggedInUser(): LoggedInUser{
    const loggedInUserStr = localStorage.getItem('loggedInUser');
    if(loggedInUserStr){
      const loggedInUser:LoggedInUser = JSON.parse(loggedInUserStr);
      return loggedInUser;
    }else{
      return null;
    }

  }

  private getAuthData(): { token: string, expiresIn: number}{
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expiresIn');
    if(!token || !expiresIn){
      return null;
    }
    return {
      token: token,
      expiresIn: +expiresIn
    }
  }
}
