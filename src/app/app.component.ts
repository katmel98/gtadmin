import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { AppConfigService } from './_services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private id: string;
  private user: string;
  private config;

  constructor(
      translate: TranslateService,
      private titleService: Title,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    // setting configuration values
    this.config = AppConfigService.settings;
  }

  ngOnInit() {

    this.activatedRoute.queryParams
      .subscribe(params => {
        console.log(params.auth);
        if ( params.auth ) {
          this.id = params.auth;
          const reb64 = CryptoJS.enc.Hex.parse(this.id);
          const bytes = reb64.toString(CryptoJS.enc.Base64);
          const decrypt  = CryptoJS.AES.decrypt(bytes, this.config.authentication.rsa.privateKey);
          const plain = decrypt.toString(CryptoJS.enc.Utf8);
          const user = JSON.parse(plain);

          return this.authService.getCredentials(user.email)
          .subscribe(data => {
            if ( data ) {
              console.log(data);
            } else {
              this.authService.logout();
            }
          });
          // return plain;
        }

      });
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  private checkUserLogIn (email: string) {
  }
}
