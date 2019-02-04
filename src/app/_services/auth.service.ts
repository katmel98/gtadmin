import { AppConfigService } from './app-config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as  _ from 'lodash';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as moment from 'moment';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private config;
    private baseUrl;
    private userSource = new BehaviorSubject({name: '', fullname: '', email: ''});
    user = this.userSource.asObservable();

    constructor(
            private http: HttpClient,
    ) {
            this.config = AppConfigService.settings;
            this.baseUrl = this.config.apiServer.authAPI;
            // this.baseUrl = 'http://localhost:3000';
    }

    changeUser(user: any) {
        console.log(user);
        this.userSource.next(user);
    }

    getCredentials(email: string): Observable<any> {
        console.log('Intentando Obtener las Credenciales ...');
        // console.log(email);
        const url = `${this.baseUrl}/auth/userData`;
        // console.log(url);
        return this.http.post<any>(url, {email} )
        .pipe(map((user: Array<any>) => {
            console.log('Usuario desde el GetCredentials');
            console.log(user);
            // user.fullname = `${user.name.trim()} ${user.lastname.trim()} ${user.surname.trim()}`.trim();
            console.log(user);
            const User = _.pick(user, ['name', 'fullname', 'access_token', 'logged_in']);
            if (user && User.access_token && User.logged_in) {
                this.setSession(user);
                return user;
            } else {
                return null;
            }
        }))
        .catch((error: any) => {
            console.log('ERROR OBTAINED');
            // console.log(error);
            // return Observable.throwError(error);
            return _.map(error);
        });
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        authResult.expiresAt = expiresAt;
        // console.log(authResult);
        localStorage.setItem('currentUser', JSON.stringify(authResult));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        window.location.href = `${this.config.redirectionApp.login}`;
    }

    setCurrentUser() {
        const User = JSON.parse(localStorage.getItem('currentUser'));
        this.changeUser(User);
    }

    getCurrentUser() {
        return this.user;
    }

    getToken() {
        if (localStorage.getItem('currentUser') !== null){
            return JSON.parse(localStorage.getItem('currentUser')).access_token;
        }
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
