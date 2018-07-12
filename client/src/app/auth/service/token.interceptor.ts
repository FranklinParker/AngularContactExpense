
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {AuthService} from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth:AuthService) {}

  /**
   * adds a header with a token
   *
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const token = this.auth.getToken();
    if(token){
      const authReq = request.clone({
        headers: request.headers.set('x-auth',token)
      });
      return next.handle(authReq);

    }else{
      return next.handle(request);

    }

  }
}
