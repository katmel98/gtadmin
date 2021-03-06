
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // let headers_object = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);

    // if (request.url.indexOf('config') > -1) {
    //   console.log(true);
    //   request1 = request.clone({
    //      url: request.url,
    //      headers: request.headers.set('Content-Type', 'application/json')
    //   });
    // }

    // console.log('Revisando la existencia del token');
    const token = this.auth.getToken();
    // console.log(token);
    let changedRequest;
    // HttpHeader object immutable - copy values
    const headerSettings: {[name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    if (token) {
      headerSettings['Authorization'] = 'bearer ' + token;
    }
    if (request.url.indexOf('config') > -1) {
      // console.log(true);
      headerSettings['Content-Type'] = 'application/json';
    }

    headerSettings['Content-Type'] = 'application/json';
    const newHeader = new HttpHeaders(headerSettings);

    changedRequest = request.clone({
      headers: newHeader});

    return next.handle(changedRequest);

  }
}
