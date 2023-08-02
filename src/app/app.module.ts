import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserService } from './_services/user.services';
import { HttpClientModule,HttpClientXsrfModule  } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { AccountActivationComponent } from './account_activation/account_activation.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { RoomComponent } from './chat-room/chat-room.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AccountActivationComponent,
    PasswordResetComponent,
    PasswordResetConfirmComponent,
    SidebarComponent,
    ChatComponent,
    RoomComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken', 
      headerName: 'X-CSRFToken',
    }),
    ReactiveFormsModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
