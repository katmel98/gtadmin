import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

import * as  _ from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = {name: '', email: ''};

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const User = this.authService.getCurrentUser();
    this.user.name = _.trim(User.name) + ' ' + _.trim(User.lastname) + ' ' + _.trim(User.surname);
    this.user.email = User.email;
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
  }
}
