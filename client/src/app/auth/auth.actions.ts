import { Action } from '@ngrx/store';
import {LoggedInUser} from "./model/loggedInUser";

export enum AuthActionTypes {
  AttemptLoginAction = '[Attempt Login] action',
  LoginAction = '[Login] Action',
  LogoutAction = '[Logout] Action'
}

export interface LoggedInInfo {
  loggedInUser: LoggedInUser, token: string, expiresInSeconds: number
};

export class Login implements Action {

  constructor(public payload: LoggedInInfo){

  }
  readonly type = AuthActionTypes.LoginAction;
}

export class AttemptLogin implements Action {

  readonly type = AuthActionTypes.AttemptLoginAction;
}


export class Logout implements Action {

  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthActions = Login
  | Logout
  | AttemptLogin;
