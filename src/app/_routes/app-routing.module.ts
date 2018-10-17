import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from '../users/users.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MessagesComponent } from '../messages/messages.component';
import { PermissionsComponent } from '../permissions/permissions.component';
import { RolesComponent } from '../roles/roles.component';
import { SyslogsComponent } from '../syslogs/syslogs.component';
import { TranslationsComponent } from '../translations/translations.component';
import { GroupsComponent } from '../groups/groups.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'permissions', component: PermissionsComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'syslogs', component: SyslogsComponent },
  { path: 'translations', component: TranslationsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
