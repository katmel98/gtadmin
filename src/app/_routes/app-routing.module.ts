import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from '../users/users.component';
import { AuthsComponent } from '../auths/auths.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MessagesComponent } from '../messages/messages.component';
import { SystemLogsComponent } from '../system-logs/system-logs.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'auths', component: AuthsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'logs', component: SystemLogsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
