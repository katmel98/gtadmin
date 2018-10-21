import { AppConfigService } from './app-config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as  _ from 'lodash';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as moment from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private config;
  private baseUrl;
  private user = {name: '', email: ''};

  constructor(
        private http: HttpClient,
  ) {
        this.config = AppConfigService.settings;
        // this.baseUrl = this.config.apiServer.authAPI;
        this.baseUrl = 'http://localhost:3000';
  }

    getCredentials(email: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/auth/userData`, {email} )
        .pipe(map((user: Array<any>) => {
            const User = _.pick(user, ['name', 'access_token', 'logged_in']);
            if (user && User.access_token && User.logged_in) {
                this.setSession(user);
                return user;
            } else {
                return null;
            }
        }))
        .catch((error: any) => {
            console.log(error);
            // return Observable.throwError(error);
            return _.map(error);
        });
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        authResult.expiresAt = expiresAt;
        localStorage.setItem('currentUser', JSON.stringify(authResult));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        window.location.href = `${this.config.redirectionApp.login}`;
    }

    setCurrentUser() {
        const User = JSON.parse(localStorage.getItem('currentUser'));
        this.user.name = _.trim(User.name) + ' ' + _.trim(User.lastname) + ' ' + _.trim(User.surname);
        this.user.email = User.email;
    }

    getCurrentUser() {
        return this.user;
    }

    getToken() {
        return JSON.parse(localStorage.getItem('currentUser')).access_token;
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

    initializePermissions() {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        const _id = user['_id'];
        return this.http.get<any>(`${this.baseUrl}/users/permissions/${_id}` )
        .subscribe((permissions: Array<any>) => {

            console.log('*** PERMISSIONS ***');
            console.log(permissions);

            // const User = _.pick(user, ['name', 'access_token', 'logged_in']);
            // if (user && User.access_token && User.logged_in) {
            //     this.setSession(user);
            //     return user;
            // } else {
            //     return null;
            // }

        },
        error => {
            console.log(error);
            // return Observable.throwError(error);
            return _.map(error);
        });

    }

}
