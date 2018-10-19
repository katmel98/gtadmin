import { AppConfigService } from './_services/app-config.service';
import { BrowserModule, Title } from '@angular/platform-browser';
import { LOCALE_ID, NgModule, APP_INITIALIZER } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { WaitComponent } from './wait/wait.component';
import { AppRoutingModule } from './_routes/app-routing.module';

import { HeaderComponent } from './_common/templates/header/header.component';
import { FooterComponent } from './_common/templates/footer/footer.component';
import { SidebarComponent } from './_common/templates/sidebar/sidebar.component';
import { RightbarComponent } from './_common/templates/rightbar/rightbar.component';
import { ChatComponent } from './_common/templates/chat/chat.component';
import { SearchComponent } from './_common/templates/search/search.component';

import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './_common/templates/user/user.component';
import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { SyslogsComponent } from './syslogs/syslogs.component';
import { TranslationsComponent } from './translations/translations.component';
import { GroupsComponent } from './groups/groups.component';
import { TruncateModule } from 'ng2-truncate';
import { TooltipModule } from 'ng2-tooltip-directive';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function initializeApp(appConfig: AppConfigService) {
  return () => appConfig.load();
}

// export function createTranslateLoader(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    AppComponent,
    WaitComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RightbarComponent,
    ChatComponent,
    SearchComponent,
    MessagesComponent,
    DashboardComponent,
    UserComponent,
    RolesComponent,
    PermissionsComponent,
    SyslogsComponent,
    TranslationsComponent,
    GroupsComponent,
  ],
  imports: [
    TruncateModule,
    TooltipModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
    }),
    AppRoutingModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService], multi:  true
    },
    {provide: LOCALE_ID, useValue: 'ES'},
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
