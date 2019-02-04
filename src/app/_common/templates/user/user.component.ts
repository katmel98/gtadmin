import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

import * as  _ from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  user;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    console.log('INITIALIZING USER COMPONENT');
    // console.log(JSON.parse(localStorage.getItem('currentUser')));
    const  User = JSON.parse(localStorage.getItem('currentUser'));
    if (User) {
      this.user = User;
    } else {
      this.user = this.authService.user.subscribe(user => this.user = user);
    }
    // console.log(this.user);
  }

  ngOnDestroy() {
    this.user.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
