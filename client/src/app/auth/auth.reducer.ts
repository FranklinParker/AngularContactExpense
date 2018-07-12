import {LoggedInUser} from "./model/loggedInUser";
import {AuthActions, AuthActionTypes} from "./auth.actions";


export interface AuthState {
  loggedInUser: LoggedInUser,
  loggedIn: boolean,
  token: string
}

export const initialState: AuthState = {
  loggedIn: false,
  loggedInUser: undefined,
  token: undefined
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      console.log('login action');
      return {
        loggedIn: true,
        loggedInUser: action.payload.loggedInUser,
        token: action.payload.token
      };
    case AuthActionTypes.LogoutAction:
      return {
        loggedIn: false,
        loggedInUser: undefined,
        token: undefined

      }
    default:
      return state;
  }
}
