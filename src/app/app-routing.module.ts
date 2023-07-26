import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AccountActivationComponent } from './account_activation/account_activation.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './password-reset-confirm/password-reset-confirm.component';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'', component:HomeComponent },
  { path:'home', component:HomeComponent },
  { path:'register', component:RegisterComponent },
  { path:'activate-account/:key', component:AccountActivationComponent },
  { path: 'reset-password', component: PasswordResetComponent },
  { path: 'accounts/user/password/reset/confirm/:uidb64/:token', component: PasswordResetConfirmComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
