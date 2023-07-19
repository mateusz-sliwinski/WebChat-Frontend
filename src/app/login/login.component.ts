import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { UserService } from "../services/user.services";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  user!: FormGroup;

 constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  get f(){
    return this.user!.controls;
  }

  onSubmit() {
    this.userService.login(this.f["email"].value, this.f["password"].value)
  }
}
