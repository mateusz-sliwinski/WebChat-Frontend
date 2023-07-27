import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../_services/user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user!: FormGroup;

  constructor(private userService: UserService, private router: Router) {}
  message: string | undefined;

  isModalVisible = false;

  ngOnInit(): void {
    this.user = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  get f() {
    return this.user!.controls;
  }

  onSubmit() {
    this.userService
      .login(this.f['email'].value, this.f['password'].value)
      .subscribe(
        () => {
          this.message = 'login successfully.';
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error login:', error);
          this.message = 'Error login .';
        }
      );
  }

  openModal() {
    this.isModalVisible = true;
    console.log('true');
  }
}
