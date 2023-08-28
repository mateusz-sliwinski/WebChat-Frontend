import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

import { UserService } from '../_services/auth_user.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;
  registrationSuccess: boolean = false;
  emailAlreadyExists: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.register = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password1: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        password2: new FormControl('', [Validators.required]),
        first_name: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
        ]),
        last_name: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
        ]),
        birth_date: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const password1 = control.get('password1')?.value;
    const password2 = control.get('password2')?.value;
    if (password1 !== password2) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.register.valid) {
      const formData = this.register.value;
      this.userService.create(formData).subscribe(
        response => {
          this.register.reset();
        },
        error => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
