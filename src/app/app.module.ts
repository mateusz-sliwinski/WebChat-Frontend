import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientXsrfModule } from '@angular/common/http';
import { UserService } from './_services/auth_user.services';
import { RegisterComponent } from './register/register.component';
import { AccountActivationComponent } from './account_activation/account_activation.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { RoomComponent } from './chat-room/chat-room.component';
import { UsersComponent } from './users/users.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { BoardComponent } from './board/board.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './_helpers/HttpRequestInterceptor';
import { DatePipe } from '@angular/common';
import { CommentaryComponent } from './commentary/commentary.component';
import { ReportComponent } from './report/report.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AccountActivationComponent,
    PasswordResetComponent,
    PasswordResetConfirmComponent,
    ChatComponent,
    BoardComponent,
    SidebarComponent,
    CommentaryComponent,
    RoomComponent,
    UsersComponent,
    InvitationsComponent,
    ReportComponent,
    NotFoundComponent,

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
  providers: [
    UserService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
