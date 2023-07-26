import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.services';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  password_reset!: FormGroup;
  
  constructor(private userService: UserService) { }

  message: string | undefined;

  ngOnInit(): void {
    this.password_reset = new FormGroup({
        email: new FormControl(''),
      });
  }

  get f(){
    return this.password_reset!.controls;
  }

  onSubmit(): void {
    this.userService.resetPassword(this.f["email"].value).subscribe(
      response => {
          this.message = 'send link to email.';
      },
      error => {
        this.message = 'failed to send link.';
      }
    );
  }
}