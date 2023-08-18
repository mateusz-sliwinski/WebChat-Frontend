import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { RoomComponent } from './chat-room/chat-room.component';
import { RegisterComponent } from './register/register.component';
import { AccountActivationComponent } from './account_activation/account_activation.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';
import { AuthGuard } from './_helpers/auth-guard.component';
import { UsersComponent } from './users/users.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { CommentaryComponent } from './commentary/commentary.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { mustLogin: false } },
  // { path: '', component: BoardComponent },
  { path: 'home', component: BoardComponent, canActivate: [AuthGuard], data: { mustLogin: true } },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: { mustLogin: false }},
  { path:'chat', component:RoomComponent , canActivate: [AuthGuard], data: { mustLogin: true } },
  { path:'chat/:roomName', component:ChatComponent , canActivate: [AuthGuard], data: { mustLogin: true } },
  { path:'users', component:UsersComponent , canActivate: [AuthGuard], data: { mustLogin: true } },
  { path:'invitations', component:InvitationsComponent , canActivate: [AuthGuard], data: { mustLogin: true } },
  { path: 'commentary/:postId', component: CommentaryComponent , canActivate: [AuthGuard], data: { mustLogin: true } },

  {
    path: 'activate-account/:key',
    component: AccountActivationComponent,
    canActivate: [AuthGuard],
    data: { mustLogin: false }
  },
  {
    path: 'reset-password',
    component: PasswordResetComponent,
    canActivate: [AuthGuard],
    data: { mustLogin: false }
  },
  {
    path: 'accounts/user/password/reset/confirm/:uidb64/:token',
    component: PasswordResetConfirmComponent,
    canActivate: [AuthGuard],
    data: { mustLogin: false }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
