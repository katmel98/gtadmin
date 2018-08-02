import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
