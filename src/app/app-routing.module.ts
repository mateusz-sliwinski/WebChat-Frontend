import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AccountActivationComponent } from './account_activation/account_activation.component';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'', component:HomeComponent },
  { path:'home', component:HomeComponent },
  { path:'register', component:RegisterComponent },
  { path:'activate-account/:key', component:AccountActivationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
