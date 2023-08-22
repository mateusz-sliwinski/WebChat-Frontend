import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_services/auth_user.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user!: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }
  message: string | undefined;

  isModalVisible = true;

  ngOnInit(): void {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  get f() {
    return this.user!.controls;
  }

  // onSubmit() {
  //   this.userService
  //     .login(this.f['email'].value, this.f['password'].value)
  //     .subscribe(
  //       () => {
  //         this.message = 'login successfully.';
  //         this.router.navigate(['/home']);
  //       },
  //       error => {
  //         console.error('Error login:', error);
  //         this.message = 'Error login .';
  //       }
  //     );
  // }

  onSubmit() {
    this.userService.login(this.f['email'].value, this.f['password'].value)
      .subscribe(
        () => {
          this.message = 'login successfully.';
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error login:', error);
          if (error.status === 400) {
            this.message = 'Invalid credentials. Please check your email and password.';
          } else {
            this.message = 'An error occurred while logging in.';
          }
        }
      );
  }

  openModal() {
    this.isModalVisible = true;
  }
}
