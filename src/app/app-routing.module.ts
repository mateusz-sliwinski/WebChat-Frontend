import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AccountActivationComponent } from './account_activation/account_activation.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';
import { AuthGuard } from './auth-guard/auth-guard.component';

const routes: Routes = [
  { path:'login', component:LoginComponent ,canActivate: [AuthGuard]},
  { path:'', component:HomeComponent },
  { path:'home', component:HomeComponent },
  { path:'register', component:RegisterComponent,canActivate: [AuthGuard] },
  { path:'activate-account/:key', component:AccountActivationComponent, canActivate: [AuthGuard]},
  { path: 'reset-password', component: PasswordResetComponent,canActivate: [AuthGuard] },
  { path: 'accounts/user/password/reset/confirm/:uidb64/:token', component: PasswordResetConfirmComponent,canActivate: [AuthGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
