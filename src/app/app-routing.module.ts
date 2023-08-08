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

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path:'chat', component:RoomComponent },
  { path:'chat/:roomName', component:ChatComponent },
  { path:'users', component:UsersComponent },
  { path:'invitations', component:InvitationsComponent },
  {
    path: 'activate-account/:key',
    component: AccountActivationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password',
    component: PasswordResetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'accounts/user/password/reset/confirm/:uidb64/:token',
    component: PasswordResetConfirmComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
