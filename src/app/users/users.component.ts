import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [
    {
      _id: '5b6da3e7e8d4ec8251ca8dbc',
      roles: ['sales', 'marketing'],
      created_at: 1533912039200,
      updated_at: 1549101946156,
      name: 'Melvin',
      lastname: 'Sequera',
      surname: 'Iriarte',
      fullname: 'Melvin Sequera Iriarte',
      email: 'katmel98@gmail.com',
      groups: [
        'AdminGroup'
      ],
      email_verified: false,
      last_login: 1549101946151,
      last_logout: 1538497081271,
      logged_in: true,
      phone: '0034671624128',
      address: 'Calle Tulipanes 6, 4A, Fuenlabrada, Madrid'
    },
    {
      _id: '5b6da3e7e8d4ec8251ca8dbd',
      roles: ['sales', 'marketing'],
      created_at: 1533912039200,
      updated_at: 1549101946156,
      name: 'Katya',
      lastname: 'Acevedo',
      surname: 'Rosales',
      fullname: 'Katya Acevedo Rosales',
      email: 'danireth2006@gmail.com',
      groups: [
        'AdminGroup'
      ],
      email_verified: false,
      last_login: 1549101946151,
      last_logout: 1538497081271,
      logged_in: true,
      phone: '0034620435825',
      address: 'Calle Tulipanes 6, 4A, Fuenlabrada, Madrid'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  // List all the users in platform
  fetchUsers() {

  }

  // Create new user
  addUser() {
    console.log('Adding user!');
  }

  // Filter list by favorite check (star)
  filterByFavorite() {
    console.log('Star Filtered');
  }

  // Delete every user marked with a check
  markedDelete() {
    console.log('Mark deleted!');
  }

  // Create new tag to filter the users list
  createTag() {
    console.log('Creating Tag!');
  }

  // Filter list by selected tag
  filterByTag(id: string) {
    console.log(`List Filtered by ${id}`);
  }

  // (Un)Check all users list
  checkUsers() {
    console.log('Users Checked!');
  }
}
