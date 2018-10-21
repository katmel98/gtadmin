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
    this.user = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }
}
