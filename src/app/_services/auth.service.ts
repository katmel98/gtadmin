import { AppConfigService } from './app-config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as  _ from 'lodash';
import { map } from 'rxjs/operators';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config;
  private baseUrl;

  constructor(
        private http: HttpClient,
  ) {
        this.config = AppConfigService.settings;
        this.baseUrl = this.config.apiServer.authAPI;
  }

    getCredentials(email: string) {
        return this.http.post<any>(`${this.baseUrl}/auth/userData`, {email} )
        .pipe(map((user: Array<any>) => {
          console.log('************');
          console.log(user);
          const User = _.pick(user, ['name', 'access_token', 'logged_in']);
          console.log(user);
          if (user && User.access_token && User.logged_in) {
              this.setSession(user);
              return user;
          } else {
              return null;
          }
        }));
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        authResult.expiresAt = expiresAt;
        console.log(authResult);
        localStorage.setItem('currentUser', JSON.stringify(authResult));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }


}
