import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiuxModule } from './uiux.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from './services/notification.service';
import { UserState } from './ngxs/user/user.state';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { EnumArrayPipe } from './pipes/enum-array.pipe';
import { GameState } from './ngxs/game/game.state';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    RegisterComponent,
    LoginComponent,
    CreateRoomComponent,
    EnumArrayPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    UiuxModule,
    FormsModule,
    UiuxModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([
      UserState,
      GameState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({key: 'user'})
  ],
  entryComponents: [RegisterComponent, LoginComponent],
  providers: [
    { provide: NOTIFICATION_SERV_TOKEN, useClass: NotificationService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
