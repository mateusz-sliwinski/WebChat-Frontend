import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../_services/user.services";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  register!: FormGroup;

 constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.register = new FormGroup({
      email: new FormControl(''),
      password1: new FormControl(''),
      password2: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      birth_date: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.register.valid) {
      const formData = this.register.value;
      this.userService.create(formData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    } else {
      // Form is invalid, display error messages or handle as needed
    }
  }
}